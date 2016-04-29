class TasksIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = { tasks: this.props.initialTasks };
    this.refreshTasks = this.refreshTasks.bind(this);
    this.addTaskClicked = this.addTaskClicked.bind(this);
  }

  componentDidMount() {
    PubSub.subscribe('tasksTouched', this.refreshTasks);
    PubSub.subscribe('dismissEdit', this.removeEditFormModal);
  }

  componentWillUnmount() {
    PubSub.unsubscribe('tasksTouched');
    PubSub.unsubscribe('dismissEdit');
  }

  refreshTasks() {
    var url = Routes.client_legal_case_tasks_path(this.props.clientId, this.props.legalCaseId);
    makeGetRequest(url)
      .success(response=> {
        this.setState({ tasks: response.tasks });
        this.removeEditFormModal();

        // $('#editFormModal').find('form').trigger('reset'); // Clear input fields in modal.
      })
      .error(xhr=> {
        console.error(url, xhr.status, xhr.statusText);
      });
  }

  // Remove modal from DOM.
  removeEditFormModal() {
    $('#editFormModal').modal('hide');
    ReactDOM.unmountComponentAtNode(document.getElementById('editModalContainer'));
  }

  addTaskClicked(e) {
    e.preventDefault();

    // Render modal...
    ReactDOM.render(
      <EditFormModal
        legalCaseId={this.props.legalCaseId}
        clientId={this.props.clientId}
        priceCategories={this.props.priceCategories}
      />,
      document.getElementById('editModalContainer')
    );
    $('#editFormModal').modal(); // ...and display it.
  }

  render() {
    var taskRows = this.state.tasks.map(task=>
      <TaskRow
        key={task.id}
        task={task}
        legalCaseId={this.props.legalCaseId}
        clientId={this.props.clientId}
        priceCategories={this.props.priceCategories}
      />
    );

    return (
      <div className="col-md-12">
        <div id="editModalContainer"></div>
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">Specifikation avseende arbeten</h3>
          </div>
          <table className="panel-body table table-hover">
            <thead>
              <tr>
                <th>Datum</th>
                <th>Notering</th>
                <th className="nowrap">Arbetad tid</th>
                <th className="nowrap">Priskategori</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {taskRows}
            </tbody>
          </table>
          <div className="panel-footer">
            <a href="#" onClick={this.addTaskClicked}>Lägg till uppgift</a>
          </div>
        </div>
      </div>
    );
  }
}

TasksIndex.propTypes = {
  initialTasks: React.PropTypes.array.isRequired,
  legalCaseId: React.PropTypes.number.isRequired,
  clientId: React.PropTypes.number.isRequired,
  priceCategories: React.PropTypes.array.isRequired,
};
