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
        selectedEKL: null,
        confirmDeleteDialog: false,
        selectedEKLValid: true,
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

        onEKLSelected(selectedEKL) {
            axios
                .get(selectedEKL.url)
                .then(response => {
                    this.selectedEKL = response.data
                    this.selectedEKL.url = selectedEKL.url;
                    this.selectedEKL.version = response.headers["etag"];
                })
                .catch(error => {
                    this.errorMessage = error.response.statusText;
                    this.errorOccured = true;
                });
        },

        onDeleteTodoClicked() {
            this.confirmDeleteDialog = false;
            axios
                .delete(this.selectedEKL.url)
                .then(response => {
                    this.selectedEKL = null;
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
                    this.selectedEKL.url,
                    this.selectedEKL,
                    {
                        headers: {"If-Match": this.selectedEKL.version}
                    })
                .then(response => {
                    this.selectedEKL = null;
                    this.loadTodos();
                })
                .catch(error => {
                    this.errorMessage = error.response.statusText;
                    this.errorOccured = true;
                });
        }
    }
});