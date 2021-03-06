import React from "react";
import { Link } from "react-router";
import ImageSet from "components/ImageSet/ImageSet";
import DangerousHTML from "components/DangerousHTML/DangerousHTML";

import { imageURL, resourceURL } from "utils";

function FeaturedList({ featured, type }) {
  return (
    <ul className="o-feat-list">
      {featured.map((item, index) => (
        <li key={index} className="o-feat-list__item o-card">
          {!item.cover
            ? null
            : <ImageSet
                src={imageURL(type, item.cover.filename)}
                className="o-card__figure"
              />}
          <div className="o-card__body">
            <Link to={resourceURL(type, item.slug)}>
              <h3 className="c-heading c-heading--small">
                {item.title}
              </h3>
            </Link>
            {!item.content
              ? null
              : <DangerousHTML content={item.content.slice(0, 200) + " ..."} />}
          </div>
        </li>
      ))}
    </ul>
  );
}

FeaturedList.propTypes = {
  featured: React.PropTypes.array
};

export default FeaturedList;
