<div className={style.inputWrapper}>
  {
    this.filterTypes.map(type => {
      return (
        <div key={type}>
          <input
            id={type}
            className={style.checkbox}
            type="checkbox" value={type}
            checked={this.state.filter === type}
            onChange={this.handleInputChange.bind(null, type)}
          /> 
          <label className={style.checkboxLabel} htmlFor={type}>{type}</label>
        </div>
      )
    })
  }
</div

<div className={style.column}>
  <pre>
    <h1>{this.state.filter}</h1>
    <span dangerouslySetInnerHTML={{__html: this.prettyPrint(this.state.data[this.state.filter] || {})}}></span>
  </pre>
</div>

.exportButton {
    background: #8a8a8a;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-weight: 700;
    outline: none;
    position: relative;
    transition: all 0.3s;

    &:hover {
      background-color: #222;
      color: #E9E9E9;
    }

    filterTypes = [ 'states', 'transitions', 'targets' ] 
  