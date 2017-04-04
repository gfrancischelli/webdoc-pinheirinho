import React from "react";
import { Link } from "react-router";
import { imageURL, resourceURL } from "utils";
import ImageSet from "components/ImageSet/ImageSet";

const GalleriesList = ({ posts }) => (
  <ul style={{ justifyContent: "flex-start" }} className="o-mosaic">
    {posts.map(post => (
      <li key={post._id} className="o-mosaic__item o-mosaic__item--100@sm">
        <div className="o-card">
          {!post.cover
            ? null
            : <ImageSet
                src={imageURL("galleries", post.cover.filename)}
                className="o-card__figure"
              />}
          <div className="o-card__body">
            <Link to={resourceURL("galerias", post.slug)}>
              <h5 className="o-card__title">
                {post.title}
              </h5>
            </Link>
          </div>
        </div>
      </li>
    ))}
  </ul>
);

GalleriesList.propTypes = {
  posts: React.PropTypes.array.isRequired
};

export default GalleriesList;
