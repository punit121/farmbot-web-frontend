import React from 'react';
import { Navbar } from '../../components/navbar';
import { fetchDevice, sendCommand } from '../../actions/bot_actions';

class DirectionButton extends React.Component {
  sendCommand() {
    var payload = { name: "moveRelative", speed: 100 };
    var multiplier = ((this.props.direction == "up") ||
                      (this.props.direction == "right")) ? 1 : -1;
    payload[this.props.axis] = 250 * multiplier;
    this.props.dispatch(sendCommand(payload));
  }

  render() {
    var classes =
      "button-like fa fa-2x arrow-button radius fa-arrow-" +
      this.props.direction;
    return <button onClick={this.sendCommand.bind(this)}
                   className={classes}>
             <i />
           </button>
  }
}

export class Controls extends React.Component {
render() {
  return (
      <div>
        <Navbar/>
          <div className="all-content-wrapper">
          <div ng-view className="ng-scope">
            <div className="row ng-scope">
              <div className="col-md-4 col-sm-6 col-xs-12 col-md-offset-1">
                <div>
                  <div className="widget-wrapper">
                    <div className="row">
                      <div className="col-sm-12">
                        <stopbutton><button className="red button-like widget-control" type="button">E-STOP</button></stopbutton>
                        <div className="widget-header">
                          <h5>Move</h5>
                        </div>
                      </div>
                      <div className="col-sm-12">
                        <div className="widget-content">
                          <label className="text-center">MOVE AMOUNT (mm) Busy</label>
                          <div className="row">
                            <div className="col-sm-12">
                              <div className="move-amount-wrapper">
                                <button className="move-amount no-radius leftmost" stepsize={1}>1</button>
                                <button className="move-amount no-radius" stepsize={10}>10</button>
                                <button className="move-amount no-radius" stepsize={100}>100</button>
                                <button className="move-amount no-radius move-amount-selected" stepsize={1000}>1,000</button>
                                <button className="move-amount no-radius rightmost" stepsize={10000}>10,000</button>
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <table align="center" className="jog-table" style={{border: 0}}>
                              <tbody><tr>
                                  <td />
                                  <td />
                                  <td />
                                  <td>
                                    <DirectionButton axis="y" direction="up" {...this.props}>
                                    </DirectionButton>
                                  </td>
                                  <td />
                                  <td />
                                  <td>
                                    <DirectionButton axis="z" direction="up" {...this.props}>
                                    </DirectionButton>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <button className="button-like i fa fa-home arrow-button" ng_click="home()" />
                                  </td>
                                  <td />
                                  <td>
                                    <DirectionButton axis="x" direction="left" { ...this.props }>
                                    </DirectionButton>
                                  </td>
                                  <td>
                                    <DirectionButton axis="y" direction="down" { ...this.props }>
                                    </DirectionButton>
                                  </td>
                                  <td>
                                    <DirectionButton axis="x" direction="right" { ...this.props }>
                                    </DirectionButton>
                                  </td>
                                  <td />
                                  <td>
                                    <DirectionButton axis="z" direction="down" { ...this.props }>
                                    </DirectionButton>
                                  </td>
                                </tr>
                                <tr>
                                  <td />
                                </tr>
                              </tbody></table>
                          </div>
                          <div className="row">
                            <div className="col-xs-7 col-sm-6 col-sm-offset-1">
                              <label>GANTRY (X)</label>
                            </div>
                            <div className="col-xs-5 col-sm-4 end">
                              <manualmovementinput axis="x" axisdata="axisdata" className="ng-isolate-scope"><input className="move-input ng-pristine ng-untouched ng-valid" ng_blur="buffer.out()" placeholder={0} ng_style="buffer.dirty ? {'border-color':'red'} : {}" ng_focus="buffer.in()" ng_model="buffer.val" ng_model_options="{ getterSetter: true }" type="text" /></manualmovementinput>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-xs-7 col-sm-6 col-sm-offset-1">
                              <label>CROSS-SLIDE (Y)</label>
                            </div>
                            <div className="col-xs-5 col-sm-4 end">
                              <manualmovementinput axis="y" axisdata="axisdata" className="ng-isolate-scope"><input className="move-input ng-pristine ng-untouched ng-valid" ng_blur="buffer.out()" placeholder={0} ng_style="buffer.dirty ? {'border-color':'red'} : {}" ng_focus="buffer.in()" ng_model="buffer.val" ng_model_options="{ getterSetter: true }" type="text" /></manualmovementinput>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-xs-7 col-sm-6 col-sm-offset-1">
                              <label>Z-AXIS (Z)</label>
                            </div>
                            <div className="col-xs-5 col-sm-4 end">
                              <manualmovementinput axis="z" axisdata="axisdata" className="ng-isolate-scope"><input className="move-input ng-pristine ng-untouched ng-valid" ng_blur="buffer.out()" placeholder={0} ng_style="buffer.dirty ? {'border-color':'red'} : {}" ng_focus="buffer.in()" ng_model="buffer.val" ng_model_options="{ getterSetter: true }" type="text" /></manualmovementinput>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-xs-5 col-sm-4 col-xs-offset-7 end">
                              <button className="full-width green button-like" ng_click="manualMovement()">GO</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="widget-wrapper">
                    <div className="row">
                      <div className="col-sm-12">
                        <div className="widget-header">
                          <h5>Tool Control</h5>
                        </div>
                      </div>
                      <div className="col-sm-12">
                        <div className="widget-content no-bottom-padding">
                          <div className="row">
                            <div className="col-sm-6">
                              <label className="inline">VACUUM PUMP</label>
                            </div>
                            <div className="col-sm-6">
                              <togglebutton peripheral="vacuum"><button className="button tool-toggle radius red green" ng-class="{red: !pinStatus, green: pinStatus}"> LOADING </button></togglebutton>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-sm-6">
                              <label className="inline">WATER VALVE</label>
                            </div>
                            <div className="col-sm-6">
                              <togglebutton peripheral="water"><button className="button tool-toggle radius red green" ng-class="{red: !pinStatus, green: pinStatus}"> LOADING </button></togglebutton>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-sm-6">
                              <label className="inline">LED</label>
                            </div>
                            <div className="col-sm-6">
                              <togglebutton peripheral="led"><button className="button tool-toggle radius red green" ng-class="{red: !pinStatus, green: pinStatus}"> LOADING </button></togglebutton>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-sm-6 col-xs-12">
                <div>
                  <div className="widget-wrapper">
                    <div className="row">
                      <div className="col-sm-12">
                        <div className="widget-header">
                          <h5>Camera</h5>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-12">
                        <img className="padding-bottom" src="http://108.90.200.9:8080/?action=stream" style={{width: '100%', height: 'auto', paddingBottom: 0}} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}
};