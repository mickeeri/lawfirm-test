class LawsuitsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { lawsuits: props.lawsuits }; // TODO: rename to initial..
    this.refreshLawsuits = this.refreshLawsuits.bind(this);
  }

  componentDidMount() {
    PubSub.subscribe('lawsuitsTouched', this.refreshLawsuits);
  }

  componentWillUnmount() {
    PubSub.unsubscribe('lawsuitsTouched');
  }

  refreshLawsuits() {
    const url = `${Routes.lawsuits_path()}?client_id=${this.props.clientId}`;
    makeGetRequest(url)
      .success(response => {
        this.setState({ lawsuits: response.lawsuits });
        PubSub.publish('dismissEdit');
      })
      .error(xhr => {
        console.error(url, xhr.status, xhr.statusText);
      });
  }

  render() {
    return (
      <div className="card">
        <div className="card-block">
          <h3 className="card-title">Ärenden</h3>
          <hr />
          <ul className="show-page-list">
          {this.state.lawsuits.map(lawsuit =>
            <li key={lawsuit.id}>
              <a href={Routes.lawsuit_path(lawsuit.id)}>{lawsuit.lawsuitType.name}</a>
              <span> ({lawsuit.slug})</span>
            </li>
          )}
          </ul>
          <AddLawsuitButton clientId={this.props.clientId} />
        </div>
      </div>
    );
  }
}

LawsuitsList.propTypes = {
  lawsuits: React.PropTypes.arrayOf(React.PropTypes.shape({
    id: React.PropTypes.number.isRequired,
    lawsuitType: React.PropTypes.object.isRequired,
  })),
  clientId: React.PropTypes.number.isRequired,
};
