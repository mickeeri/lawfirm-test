class LawsuitCounterpartList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { counterparts: props.counterparts };
  }

  componentDidMount() {
    PubSub.subscribe('counterpartListUpdated', this.refreshCounterParts.bind(this));
  }

  componentWillUnmount() {
    PubSub.unsubscribe('counterpartListUpdated');
  }

  refreshCounterParts() {
    const url = `/lawsuits/${this.props.lawsuitId}/counterparts`;
    makeGetRequest(url)
      .success(res => {
        this.setState({ counterparts: res.counterparts });
        PubSub.publish('dismissEdit');
      })
      .error(xhr => {
        console.error(url, xhr.status, xhr.statusText);
      });
  }

  render() {
    return (
      <div className="card card-block">
        <h3 className="card-title">
          {this.props.counterparts.length > 1 ? 'Motparter' : 'Motpart'}
        </h3>
        <ul className="show-page-list">
          {this.state.counterparts.map(counterpart =>
            <li key={counterpart.id}>
              <a href={Routes.counterpart_path(counterpart.id)}>
                {counterpart.name} ({counterpart.personalNumber})
              </a>
            </li>
          )}
        </ul>
        <div id="editModalContainer"></div>
        <div className="content-right">
          <AddCounterpartButton
            addNewCounterpart={false}
            lawsuitId={this.props.lawsuitId}
          />
          <AddCounterpartButton
            addNewCounterpart
            lawsuitId={this.props.lawsuitId}
          />
        </div>
      </div>
    );
  }
}

LawsuitCounterpartList.propTypes = {
  counterparts: React.PropTypes.array.isRequired,
  lawsuitId: React.PropTypes.number.isRequired,
};