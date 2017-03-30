import React from "react";

import { resourceURL, imageURL, concatArray } from "utils";

import Pagination from "components/Pagination/Pagination";
import GalleriesList from "components/GalleriesList/GalleriesList";

class GalleriesPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      pagination: {
        pages: []
      }
    };
    this.store = this.props.store;
  }

  componentDidMount() {
    const currentPage = this.props.location.query.page || 1;
    const self = this;

    this.data$ = self.store.dataStream("galleries").subscribe({
      next: pages => {
        if (pages.posts == undefined) {
          console.warn("galleries is undefined");
          return;
        } else {
          self.setState(pages);
        }
      }
    });

    this.store.request(currentPage, "galleries");
  }

  componentWillUnmount() {
    // Delete obj to prevent memory leak
    this.data$ = null;
    this.store.close("galleries");
  }

  componentWillReceiveProps(nextProps) {
    const page = nextProps.location.query.page;
    this.store.request(page, "galleries");
  }

  render() {
    const { posts, pagination } = this.state;
    return (
      <main className="o-band">
        <section className="o-wrapper o-wrapper--slim@ds">
          <h2 className="c-heading c-heading--large@ds">
            Galerias
          </h2>
          <div className="o-layout">
            <div className="o-layout__item">
              {posts == undefined ? null : <GalleriesList posts={posts} />}
            </div>
          </div>
          {pagination.pages.length < 2
            ? null
            : <Pagination pagination={pagination} />}
        </section>
      </main>
    );
  }
}

export default GalleriesPage;
