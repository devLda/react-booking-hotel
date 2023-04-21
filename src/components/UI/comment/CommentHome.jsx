import React from "react";

import '../../../styles/commenthome.css'

import avata_1 from '../../../assets/img/team/1.jpg'
import quote from '../../../assets/img/quot.png' 

const CommentHome = () => {
  return (
    <div class="item">
        <span class="quote">
          <img src={quote} alt="quote" />
        </span>
        <p>
          Hotel dapibus asue metus the nec feusiate eraten miss hendreri net ve
          ante the lemon sanleo nectan feugiat erat hendrerit necuis ve ante
          otel inilla duiman at finibus viverra neca the sene on satien the miss
          drana inc fermen norttito sit space, mus nellentesque habitan.
        </p>
        <div class="info">
          <div class="author-img">
            <img src={avata_1} alt="avata" />
          </div>
          <div class="cont"> 
            <span>
              <i class="star-rating"></i>
              <i class="star-rating"></i>
              <i class="star-rating"></i>
              <i class="star-rating"></i>
              <i class="star-rating"></i>
            </span>
            <h6>Emily Brown</h6> <span>Guest review</span>
          </div>
        </div>
      </div>
  );
};

export default CommentHome;
