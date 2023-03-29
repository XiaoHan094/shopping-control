import { ref, reactive, computed } from "vue"
import { toast } from "~/composables/util"
// 列表，分页，搜索，删除，修改状态
export function useInitTable(opt = {}) {
    let searchForm = null
    let resetSearchForm = null
    if (opt.searchForm) {
        searchForm = reactive({ ...opt.searchForm })
        resetSearchForm = () => {
            for (const key in opt.searchForm) {
                searchForm[key] = opt.searchForm[key]
            }
            getData()
        }
    }

    const tableData = ref([])
    const loading = ref(false)

    // 分页
    const currentPage = ref(1)
    const total = ref(0)
    const limit = ref(10)

    // 获取数据
    function getData(p = null) {
        if (typeof p == "number") {
            currentPage.value = p
        }

        loading.value = true
        opt.getList(currentPage.value, searchForm)
            .then(res => {
                if (opt.onGetListSuccess && typeof opt.onGetListSuccess == "function") {
                    opt.onGetListSuccess(res)
                } else {
                    tableData.value = res.list
                    total.value = res.totalCount
                }
            })
            .finally(() => {
                loading.value = false
            })
    }

    getData()

    // 删除表单数据
    const handleDelete = (id) => {
        loading.value = true
        // 传入需要删除的id
        opt.delete(id).then(res => {
            toast("删除成功")
            getData()
        }).finally(() => {
            loading.value = false
        })
    }


    // 修改状态
    // status传的是状态值
    const handleStatusChange = (status, row) => {
        row.statusLoading = true
        opt.updateStatus(row.id, status)
            .then(res => {
                toast("修改状态成功")
                row.status = status
            })
            .finally(() => {
                row.statusLoading = false
            })
    }

    // 多选选中ID
    const multiSelectionIds = ref([])
    const handleSelectionChange = (e) => {
        multiSelectionIds.value = e.map(o => o.id)
    }
    // 批量删除
    const multipleTableRef = ref(null)
    const handleMultiDelete = () => {
        loading.value = true
        opt.delete(multiSelectionIds.value)
            .then(res => {
                toast("删除成功")
                // 清空选中
                if (multipleTableRef.value) {
                    multipleTableRef.value.clearSelection()
                }
                getData()
            })
            .finally(() => {
                loading.value = false
            })
    }

    // 批量修改状态，批量修改上架下架
    const handleMultiStatusChange = (status) => {
        loading.value = true
        // 第一个传一维的数组ids，第二个传状态
        opt.updateStatus(multiSelectionIds.value,status)
            .then(res => {
                toast("修改状态成功")
                // 清空选中
                if (multipleTableRef.value) {
                    multipleTableRef.value.clearSelection()
                }
                getData()
            })
            .finally(() => {
                loading.value = false
            })
    }

    return {
        searchForm,
        resetSearchForm,
        tableData,
        loading,
        currentPage,
        total,
        limit,
        getData,
        handleDelete,
        handleStatusChange,
        handleSelectionChange,
        multipleTableRef,
        handleMultiDelete,
        handleMultiStatusChange,
        multiSelectionIds
    }
}

// 新增，修改
export function useInitForm(opt = {}) {
    // 表单部分
    const formDrawerRef = ref(null)
    const formRef = ref(null)
    // 用defaultForm拿到opt传过来的表单
    const defaultForm = opt.form
    const form = reactive({})
    const rules = opt.rules || {}
    const editId = ref(0)
    const drawerTitle = computed(() => editId.value ? "修改" : "新增")

    // 新增表单内容
    const handleSubmit = () => {
        formRef.value.validate((valid) => {
            if (!valid) return

            formDrawerRef.value.showLoading()

            let body = {}
            if(opt.beforeSubmit && typeof opt.beforeSubmit == "function"){
                body = opt.beforeSubmit({ ...form })
            } else {
                body = form
            }

            const fun = editId.value ? opt.update(editId.value, body) : opt.create(body)

            fun.then(res => {
                toast(drawerTitle.value + "成功")
                // 修改刷新当前页，新增刷新第一页
                opt.getData(editId.value ? false : 1)
                formDrawerRef.value.close()
            }).finally(() => {
                formDrawerRef.value.hideLoading()
            })

        })
    }

    // 重置表单
    function resetForm(row = false) {
        if (formRef.value) formRef.value.clearValidate()
        for (const key in defaultForm) {
            form[key] = row[key]
        }
    }

    // 新增表单触发事件
    const handleCreate = () => {
        editId.value = 0
        resetForm(defaultForm)
        formDrawerRef.value.open()
    }

    // 编辑表单触发事件
    const handleEdit = (row) => {
        editId.value = row.id
        resetForm(row)
        formDrawerRef.value.open()
    }

    return {
        formDrawerRef,
        formRef,
        form,
        rules,
        editId,
        drawerTitle,
        handleSubmit,
        resetForm,
        handleCreate,
        handleEdit
    }
}