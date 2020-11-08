import React from "react";
import { uid } from "react-uid";

/* styles and images */
import "./Stars.css";
import emptyStar from "./static/star-empty.png";
import filledStar from "./static/star-filled.png";

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

        // Add filled-in stars up until the rating the parent review is given.
        //  For example: a 4 star review will have stars 1, 2, 3, and 4 filled.
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
        return (
            <div>
                {this.drawStars(this.props.rating)}
            </div>
        );
    }

}