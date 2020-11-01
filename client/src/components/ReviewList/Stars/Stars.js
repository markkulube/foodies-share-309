import React from "react";
import { uid } from "react-uid";

/* styles and images */
import "./Stars.css";
import emptyStar from "../../../images/star-empty.png";
import filledStar from "../../../images/star-filled.png";

export default class Stars extends React.Component {

    /**
     * Return a list of filled and/or empty stars as <img>'s depending on the given rating.
     *
     * @param {int} rating  The rating number from 0-5.
     */
    drawStars(rating) {
        const updateStar = this.props.updateStar;  // obtain function to update parent state
        const parent = this.props.parent;  // obtain parent to update

        let stars = [];  // list of stars to render

        for (let i = 0; i < 5; i++) {
            if (i < rating) {
                stars.push(<img key={uid(i)} onClick={() => updateStar(parent, i + 1)}
                                className={"star"} src={filledStar} alt={"empty star"}/>);
            } else {
                stars.push(<img key={uid(i)} onClick={() => updateStar(parent, i + 1)}
                                className={"star"} src={emptyStar} alt={"filled star"}/>);
            }
        }

        return stars;
    }

    render() {
        const { rating } = this.props;

        return (
            <div>
                {this.drawStars(rating)}
            </div>
        );
    }

}