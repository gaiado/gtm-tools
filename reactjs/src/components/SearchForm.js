import React, { Component } from 'react';

export default class SearchForm extends Component {
  render() {
    return (
      <div className="row">
        <div className="col-md-4 col-sm-6">
          <div className="form-group row">
            <label className="col-5 col-sm-6 col-form-label">Account</label>
            <div className="col-7 col-sm-6">
              <select id="cbo-account" className="form-control"></select>
            </div>
          </div>
        </div>
        <div className="col-md-4 col-sm-6">
          <div className="form-group row">
            <label className="col-5 col-sm-6 col-form-label">Container</label>
            <div className="col-7 col-sm-6">
              <select id="cbo-container" className="form-control"></select>
            </div>
          </div>
        </div>
        <div className="col-md-4 col-sm-6">
          <div className="form-group row">
            <label className="col-5 col-sm-6 col-form-label">Work Space</label>
            <div className="col-7 col-sm-6">
              <select id="cbo-workspace" className="form-control"></select>
            </div>
          </div>
        </div>
        <div className="col-12">
          <div className="form-group row">
            <div className="col-6 col-sm-7 col-md-8">
              <input id="txt-search" type="text" className="form-control" />
            </div>
            <div className="col-2">
              <div data-toggle="buttons" className="btn-group btn-group-toggle">
                <label title="Regex" className="btn btn-outline-primary">
                  <input id="check-regex" type="checkbox" name="check-regex" autoComplete="off" />.*
          </label>
              </div>
            </div>
            <div className="col-4 col-sm-3 col-md-2">
              <button id="btn-search" type="button" className="btn btn-primary btn-block">Search</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}