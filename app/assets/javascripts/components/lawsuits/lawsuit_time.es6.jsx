class LawsuitTime extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: this.props.tasks,
      expenses: this.props.expenses };
    this.handleAddButtonClicked = this.handleAddButtonClicked.bind(this);
    this.renderForm = this.renderForm.bind(this);
    this.scrollToExpenses = this.scrollToExpenses.bind(this);
    this.scrollToTop = this.scrollToTop.bind(this);
  }

  scrollToTop() {
    $('html, body').animate({ scrollTop: 0 }, 'slow');
    return false;
  }

  scrollToExpenses() {
    $('html, body').animate({
      scrollTop: $('#expenses').offset().top,
    }, 'slow');
    return false;
  }

  scrollToClientFunds() {
    $('html, body').animate({
      scrollTop: $('#clientFunds').offset().top,
    }, 'slow');
    return false;
  }

  handleAddButtonClicked(e) {
    e.preventDefault();
    this.renderForm(e.target.name);
  }

  renderForm(target) {
    let form;
    let header;

    // Assigning form based on which add button user clicks.
    if (target === 'addExpense') {
      form = <ExpenseForm lawsuitId={this.props.lawsuitId} />;
      header = 'Lägg till utlägg';
    } else if (target === 'addWork') {
      form = <TaskForm lawsuitId={this.props.lawsuitId} />;
      header = 'Lägg till arbete';
    } else if (target === 'addClientFund') {
      form = <ClientFundForm lawsuitId={this.props.lawsuitId} />;
      header = 'Lägg till klientmedel';
    }

    // Render modal with specified form.
    ReactDOM.render(
      <EditFormModal
        header={header}
        form={form}
      />,
      document.getElementById('editModalContainer')
    );
    $('#editFormModal').modal(); // ...and display it.
  }

  render() {
    return (
      <div>
        <div className="alert" id="tasks-index-alert"></div>
        <div id="editModalContainer"></div>
        <div className="row">
          <h3 className="col-md-2">Arbeten</h3>
          <div className="col-md-10 content-right task-menu">
            <button
              className="btn btn-secondary"
              onClick={this.scrollToClientFunds}
            ><i className="fa fa-long-arrow-down" aria-hidden="true"></i>Gå till klientmedel
            </button>
            <button
              className="btn btn-secondary"
              onClick={this.scrollToExpenses}
            ><i className="fa fa-long-arrow-down" aria-hidden="true"></i>Gå till utlägg
            </button>
            <a
              href={`/report/${this.props.lawsuitId}/arbetsrapport.docx`}
              className="btn btn-primary-outline"
            ><i className="fa fa-file-word-o" aria-hidden="true"></i>Arbetsrapport</a>
            <a
              href={`/report/${this.props.lawsuitId}/tidrapport.docx`}
              className="btn btn-primary-outline"
            ><i className="fa fa-file-word-o" aria-hidden="true"></i>Tidrapport
            </a>
            <a
              href={`/lawsuits/${this.props.lawsuitId}/Aktomslag.pdf`}
              className="btn btn-primary-outline"
              target="_blank"
            ><i className="fa fa-file-pdf-o" aria-hidden="true"></i>Aktomslag
            </a>
            <button
              className="btn btn-success"
              onClick={this.handleAddButtonClicked}
              name="addWork"
            >Lägg till arbete</button>
          </div>
        </div>
        <TasksIndex
          tasks={this.props.tasks}
          lawsuitId={this.props.lawsuitId}
        />
        <div className="row">
          <h3 id="expenses" className="col-md-4">Utlägg</h3>
          <div className="col-md-8 content-right task-menu">
            <button
              className="btn btn-secondary"
              onClick={this.scrollToTop}
            ><i className="fa fa-long-arrow-up" aria-hidden="true"></i>Tillbaka till toppen</button>
            <button
              className="btn btn-success"
              onClick={this.handleAddButtonClicked}
              name="addExpense"
            >Lägg till utlägg</button>
          </div>
        </div>
        <ExpensesIndex
          expenses={this.props.expenses}
          lawsuitId={this.props.lawsuitId}
        />
        <div className="row">
          <h3 id="clientFunds" className="col-md-4">Klientmedel</h3>
          <div className="col-md-8 content-right task-menu">
            <button
              className="btn btn-secondary"
              onClick={this.scrollToTop}
            ><i className="fa fa-long-arrow-up" aria-hidden="true"></i>Tillbaka till toppen</button>
            <a
              href={`/lawsuits/${this.props.lawsuitId}/Klientmedel.pdf`}
              className={this.props.clientFunds.clientFundsArray.length === 0 ?
                'btn btn-primary-outline disabled' : 'btn btn-primary-outline'}
              target="_blank"
            ><i className="fa fa-file-pdf-o" aria-hidden="true"></i>Generera PDF</a>
            <button
              className="btn btn-success"
              onClick={this.handleAddButtonClicked}
              name="addClientFund"
            >Lägg till klientmedel</button>
          </div>
        </div>
        <ClientFundsIndex
          clientFunds={this.props.clientFunds}
          lawsuitId={this.props.lawsuitId}
        />
      </div>
    );
  }
}

LawsuitTime.propTypes = {
  clientId: React.PropTypes.number,
  expenses: React.PropTypes.array.isRequired,
  clientFunds: React.PropTypes.object.isRequired,
  lawsuitId: React.PropTypes.number.isRequired,
  tasks: React.PropTypes.array.isRequired,
};
