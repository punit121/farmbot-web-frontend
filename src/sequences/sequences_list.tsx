import * as React from "react";
import { selectSequence } from "./actions";
import { SequencesListProps } from "./interfaces";
import { isMobile, sortResourcesById } from "../util";
import { Link } from "react-router";
import { Row, Col, ToolTip } from "../ui/index";
import { TaggedSequence } from "../resources/tagged_resources";
import { init } from "../api/crud";
import { ToolTips } from "../constants";
import { t } from "i18next";

let buttonList = (dispatch: Function) =>
  (ts: TaggedSequence, index: number) => {
    let css = ["block-wrapper",
      "block",
      "full-width",
      "text-left",
      `${ts.body.color || "purple"}-block`,
      "block-header"].join(" ");
    let click = () => { dispatch(selectSequence(ts.uuid)); };
    let name = ts.body.name + (ts.dirty ? "*" : "");
    let { uuid } = ts;
    if (isMobile()) {
      return <Link
        to={`/app/sequences/${ts.body.name.replace(" ", "_").toLowerCase()}`}
        key={uuid}
        onClick={click}
        className={css}>
        {name}
      </Link>;
    } else {
      return <button key={uuid}
        onClick={click}
        className={css}>
        {name}
        <i className="fa fa-pencil block-control" />
      </button>;
    }
  };

export class SequencesList extends React.Component<SequencesListProps, {}> {
  emptySequence = (): TaggedSequence => {
    return {
      kind: "sequences",
      uuid: "REDUCER_MUST_CHANGE_THIS",
      body: {
        name: "new sequence " + (this.props.sequences.length + 1),
        args: { version: -999 },
        color: "gray",
        kind: "sequence",
        body: []
      }
    }
  }

  render() {
    let { sequences, dispatch } = this.props;
    return <div className="sequence-list">
      <h3>
        <i>{t("Sequences")}</i>
      </h3>
      <ToolTip helpText={ToolTips.SEQUENCE_LIST} />
      <button className="green"
        onClick={() => dispatch(init(this.emptySequence()))}>
        <i className="fa fa-plus" />
      </button>
      <Row>
        <Col xs={12}>
          {sortResourcesById(sequences).map(buttonList(dispatch))}
        </Col>
      </Row>
    </div>;
  }
}
