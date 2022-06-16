var app = new Vue({
    el: '#app',
    vuetify: new Vuetify(),
    data: {
        todosUrl: "/Projektarbeit/Web_Service/todos",
        errorOccured: false,
        errorMessage: "",
        EKListHeaders: [
            {
                text: 'Titel',
                value: 'title',
                sortable: false,
            },
            {
                text: 'Fällig',
                value: 'due_date',
                sortable: false
            },
            {
                text: 'Ersteller',
                value: 'author',
                sortable: false
            },
        ],
        todos: [],
        selectedList: null,
        confirmDeleteDialog: false,
        selectedListValid: true,
        titleValidationRules:[
            title => title != "" || "Titel eingeben."
        ],
        dueDateValidationRules:[
            dueDate => dueDate != "" || "Datum eingeben!"
        ],
    },
    created() {
        this.loadTodos();
    },
    methods: {
        loadTodos() {
            axios
                .get(this.todosUrl)
                .then(response => this.todos = response.data)
                .catch(error => {
                    this.errorMessage = error.response.statusText;
                    this.errorOccured = true;
                });
        },

        onTodoSelected(selectedList) {
            axios
                .get(selectedList.url)
                .then(response => {
                    this.selectedList = response.data
                    this.selectedList.url = selectedList.url;
                    this.selectedList.version = response.headers["etag"];
                })
                .catch(error => {
                    this.errorMessage = error.response.statusText;
                    this.errorOccured = true;
                });
        },

        onDeleteListClicked() {
            this.confirmDeleteDialog = false;
            axios
                .delete(this.selectedList.url)
                .then(response => {
                    this.selectedList = null;
                    this.loadTodos();
                })
                .catch(error => {
                    this.errorMessage = error.response.statusText;
                    this.errorOccured = true;
                });
        },

        onUpdateTodoClicked() {
            axios
                .put(
                    this.selectedList.url,
                    this.selectedList,
                    {
                        headers: {"If-Match": this.selectedList.version}
                    })
                .then(response => {
                    this.selectedList = null;
                    this.loadTodos();
                })
                .catch(error => {
                    this.errorMessage = error.response.statusText;
                    this.errorOccured = true;
                });
        }
    }
});