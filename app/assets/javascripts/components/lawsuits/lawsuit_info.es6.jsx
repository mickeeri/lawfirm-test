class LawsuitInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lawsuit: props.initialLawsuit,
    };
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-md-9">
            <div className="card card-block">
              <LawsuitForm
                initialLawsuit={this.state.lawsuit}
              />
            </div>
          </div>
          <div className="col-md-3">
            <CloseLawsuitButton
              lawsuitId={this.props.initialLawsuit.id}
              closed={this.props.closed}
            />
            <DeleteLawsuitButton
              clientId={this.props.primaryClientId}
              lawsuitId={this.props.initialLawsuit.id}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <LawsuitClientList
              clients={this.props.initialLawsuit.clients}
              lawsuitId={this.props.initialLawsuit.id}
              primaryClientId={this.props.primaryClientId}
            />
          </div>
          <div className="col-md-6">
            <LawsuitCounterpartList
              counterparts={this.props.initialLawsuit.counterparts}
              lawsuitId={this.props.initialLawsuit.id}
            />
          </div>
        </div>
      </div>
    );
  }
}

LawsuitInfo.propTypes = {
  closed: React.PropTypes.bool.isRequired,
  initialLawsuit: React.PropTypes.object.isRequired,
  primaryClientId: React.PropTypes.number.isRequired,
};
