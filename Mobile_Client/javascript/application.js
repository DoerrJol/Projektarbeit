var app = new Vue({
    el: '#app',
    vuetify: new Vuetify(),
    data: {
        todosUrl: "/Projektarbeit/Web_Service/todos",
        errorOccured: false,
        errorMessage: "",
        todoListHeaders: [
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
        selectedTodo: null,
        confirmDeleteDialog: false,
        selectedTodoValid: true,
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

        onTodoSelected(selectedTodo) {
            axios
                .get(selectedTodo.url)
                .then(response => {
                    this.selectedTodo = response.data
                    this.selectedTodo.url = selectedTodo.url;
                    this.selectedTodo.version = response.headers["etag"];
                })
                .catch(error => {
                    this.errorMessage = error.response.statusText;
                    this.errorOccured = true;
                });
        },

        onDeleteTodoClicked() {
            this.confirmDeleteDialog = false;
            axios
                .delete(this.selectedTodo.url)
                .then(response => {
                    this.selectedTodo = null;
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
                    this.selectedTodo.url,
                    this.selectedTodo,
                    {
                        headers: {"If-Match": this.selectedTodo.version}
                    })
                .then(response => {
                    this.selectedTodo = null;
                    this.loadTodos();
                })
                .catch(error => {
                    this.errorMessage = error.response.statusText;
                    this.errorOccured = true;
                });
        }
    }
});