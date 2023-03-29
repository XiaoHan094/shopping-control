import { ref,nextTick,computed } from "vue"
import {
    createGoodsSkusCard,
    updateGoodsSkusCard,
    deleteGoodsSkusCard,
    sortGoodsSkusCard,
    createGoodsSkusCardValue,
    updateGoodsSkusCardValue,
    deleteGoodsSkusCardValue,
    chooseAndSetGoodsSkusCard
} from "~/api/goods.js"

import {
    useArrayMoveUp,
    useArrayMoveDown,
    cartesianProductOf
} from "~/composables/util"

// 当前id
export const goodsId = ref(0)

// 规格选项列表
export const sku_card_list = ref([])

export const sku_list = ref([])


//初始化规格选项列表
// 初始化规格选项列表
export function initSkuCardList(d) {
    sku_card_list.value = d.goodsSkusCard.map(item => {
        item.text = item.name
        item.loading = false
        // 将原来的规格值存储，防止修改失败后，原来的值也没有了
        item.goodsSkusCardValue.map(v => {
            v.text = v.value || "属性值"
            return v
        })
        return item
    })

    sku_list.value = d.goodsSkus
    console.log(sku_list.value);
}

export const btnLoading = ref(false)
// 添加规格选项
export function addSkuCardEvent() {
    btnLoading.value = true
    createGoodsSkusCard({
        // 初始化
        goods_id: goodsId.value,//商品id
        name: "规格选项",//规格名称
        order: 50,//排序
        type: 0//规格类型
    }).then(res => {
        sku_card_list.value.push({
            // 追加合并，将res的内容和上面获得到的text，loading,goodsSkusCardValue进行合并
            ...res,
            text: res.name,
            loading: false,
            goodsSkusCardValue: []
        })

    })
        .finally(() => {
            btnLoading.value = false

        })
}

// 修改规格选项
export function handleUpdate(item) {

    // console.log(item)
    item.loading = true
    updateGoodsSkusCard(item.id, {
        "goods_id": item.goods_id,
        "name": item.text,
        "order": item.order,
        "type": 0
    })
        // 修改成功
        .then(res => {
            // 前面已经存了text
            item.name = item.text
        })
        // 修改失败
        .catch(err => {
            item.text = item.name
        })
        .finally(() => {
            item.loading = fasle
        })
}

// 删除规格选项
export function handleDelete(item) {

    item.loading = true//要把当前对象移除了
    deleteGoodsSkusCard(item.id)
        .then(res => {
            const i = sku_card_list.value.findIndex(o => o.id == item.id) //拿到索引
            if (i != -1) {
                sku_card_list.value.splice(i, 1)//当前索引传进来，只移除一个

            }
        })

}

// 初始化规格排序选项
export const bodyLoading = ref(false)

export function sortCard(action, index) {

    // 先把数组强转为字符串，防止引用传值用parse接收，赋值给变量oList,拷贝留起来，需要传给后端的
    let oList = JSON.parse(JSON.stringify(sku_card_list.value))

    let func = action == "up" ? useArrayMoveUp : useArrayMoveDown
    func(oList, index)
    console.log(oList)

    // 整理一下传回给后端，o代表对象，i是索引
    let sortData = oList.map((o, i) => {
        return {
            id: o.id,
            order: i + 1
        }
    })

    bodyLoading.value = true

    // 后端接收成功再让前端页面显示
    sortGoodsSkusCard({
        sortdata: sortData
    })
    // 上面这一段都是在为后端服务，下面这个是让前端显示
        .then(res => {

            func(sku_card_list.value, index)
        })
        .finally(() => {

            bodyLoading.value = false
        })

}

// 点击more按钮后选择设置规格
export function handleChooseSetGoodsSkusCard(id,data){
    let item = sku_card_list.value.find(o=>o.id == id)
    item.loading = true
    chooseAndSetGoodsSkusCard(id,data)
    .then(res=>{
        // console.log(res);
        item.name = item.text = res.goods_skus_card.name//更改尺寸名，text与name都需要改变
        item.goodsSkusCardValue = res.goods_skus_card_value.map(o=>{
            o.text = o.value || "属性值"
            return o
        })
        getTableData()
    })
    .finally(()=>{
        item.loading = false
    })
}

// 初始化规格的值
export function initSkusCardItem(id) {

       // console.log(id)
    // 找到同一个id
    const item = sku_card_list.value.find(o => o.id == id)
    const loading = ref(false)
    const inputValue = ref('')
    const inputVisible = ref(false)
    const InputRef = ref()

 
   

// 规格选项的小关闭按钮-删除规格选项
    const handleClose = (tag) => {
        loading.value = true
        deleteGoodsSkusCardValue(tag.id)
        .then(res=>{
            let i = item.goodsSkusCardValue.findIndex(o=>o.id === tag.id)
            if(i != -1){
                item.goodsSkusCardValue.splice(i,1)
            }
            getTableData()
        })
        .finally(()=>{
            loading.value = false
        })
    }

    const showInput = () => {
        inputVisible.value = true
        nextTick(() => {
            InputRef.value.input.focus()
        })
    }
//   添加规格选项  
    const handleInputConfirm = () => {
        // 检测inputValue输入框中有没有值
        if(!inputValue.value){
            inputVisible.value = false
            return
        }

        loading.value = true
        createGoodsSkusCardValue({
            goods_skus_card_id:id,//商品id
            name:item.name,//商品item
            order:50,//排序
            value:inputValue.value//用户输入的值
        }).then(res=>{
            item.goodsSkusCardValue.push({
                ...res,
                text:res.value
            })
            getTableData()
        })
        .finally(()=>{
            inputVisible.value = false
            inputValue.value = ''
            loading.value = false
        })

    }

    // 添加规格选项-修改
    const handleChange = (value,tag)=>{
        loading.value = true
        updateGoodsSkusCardValue(tag.id,{
            "goods_skus_card_id": id,
            "name": item.name,
            "order": tag.order, 
            "value":value
        })
        .then(res=>{
            tag.value = value
            getTableData()
        })
        .catch(err=>{
            // 修改不成功，返回原值
            tag.text = tag.value
        })
        .finally(()=>{
            loading.value = false
        })
    }

    return {
        item,
        inputValue,
        inputVisible,
        InputRef,
        handleClose,
        showInput,
        handleInputConfirm,
        loading,
        handleChange
    }
}

// 初始化表格
export function initSkuTable(){
    // 响应式用computed计算属性，需要过滤一下，保证数组里面的数据不是为0
    const skuLabels = computed(()=>sku_card_list.value.filter(v=>v.goodsSkusCardValue.length > 0))
    // 获取表头
    const tableThs = computed(()=>{
        // 拿到有多少个规格选项
        let length = skuLabels.value.length
        // 设置表头，这个是固定的
        return [{
            name:"商品规格",
            // length是为了来显示多少列，即合并多少列
            colspan:length,
            width:"",
            // 有数据就合并两行，没有就一行1
            rowspan:length > 0 ? 1 : 2
        },{
            name:"销售价",
            width:"100",
            rowspan:2
        },{
            name:"市场价",
            width:"100",
            rowspan:2
        },{
            name:"成本价",
            width:"100",
            rowspan:2
        },{
            name:"库存",
            width:"100",
            rowspan:2
        },{
            name:"体积",
            width:"100",
            rowspan:2
        },{
            name:"重量",
            width:"100",
            rowspan:2
        },{
            name:"编码",
            width:"100",
            rowspan:2
        }]
    })

    return {
        skuLabels,
        tableThs,
        sku_list
    }
}

// 获取规格表格数据
function getTableData(){
    setTimeout(() => {
        if(sku_card_list.value.length === 0) return []

        let list = []
        sku_card_list.value.forEach(o=>{
            // 这里拿到的是规格尺寸里面的值
            if(o.goodsSkusCardValue && o.goodsSkusCardValue.length > 0){
                list.push(o.goodsSkusCardValue)
            }
        })

        // 拿到是0，返回空的
        if(list.length == 0){
            return []
        }


        let arr = cartesianProductOf(...list)

        console.log(arr)


        
        // 获取之前的规格列表，将规格ID排序之后转化成字符串
        let beforeSkuList = JSON.parse(JSON.stringify(sku_list.value)).map(o=>{
            if(!Array.isArray(o.skus)){
                // 不是数组转为数组
                o.skus = Object.keys(o.skus).map(k=>o.skus[k])
            }
            o.skusId = o.skus.sort((a,b)=>a.id - b.id).map(s=>s.id).join(",")
            return o
        })

        sku_list.value = []
        sku_list.value = arr.map(skus=>{
            let o = getBeforeSkuItem(JSON.parse(JSON.stringify(skus)),beforeSkuList)
            return {
                // 初始值
                code: o?.code || "",
                cprice:o?.cprice || "0.00",
                goods_id: goodsId.value,
                image: o?.image || "",
                oprice: o?.oprice || "0.00",
                pprice: o?.pprice || "0.00",
                skus,
                stock:o?.stock ||  0,
                volume:o?.volume ||  0,
                weight:o?.weight ||  0,
            }
        })
    }, 200)
}

function getBeforeSkuItem(skus,beforeSkuList){
    let skusId = skus.sort((a,b)=>a.id - b.id).map(s=>s.id).join(",")
    return beforeSkuList.find(o=>{
        if(skus.length > o.skus.length){
            return skusId.indexOf(o.skusId) != -1
        }
        return o.skusId.indexOf(skusId) != -1
    })
}