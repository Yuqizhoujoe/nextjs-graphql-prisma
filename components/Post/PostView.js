import { Fragment } from "react";
import { responsiveDesign } from "../../shared/global";
import { useWindowSize } from "../../hooks/useWindowSize";

const PostView = ({ id, title, content, image }) => {
  const { width } = useWindowSize();
  const postViewGridStyle =
    width >= responsiveDesign.md
      ? "grid lg:grid-cols-2"
      : "grid md:grid-rows-2";
  const renderPostView = () => {
    return (
      <div
        id={id}
        className={`jojo_post_view w-3/4 mx-auto overflow-hidden shadow p-8 ${postViewGridStyle}`}
      >
        <div className="w-full h-full flex justify-center items-center lg:justify-end">
          <img
            className="h-80 lg:h-96 rounded-xl object-cover"
            src={image}
            alt={title}
          />
        </div>
        <div className="p-6 flex flex-col flex-wrap lg:max-w-md md:max-w-xl">
          <h3 className="font-bold text-2xl text-center">{title} 🤣</h3>
          <p className="">{content}</p>
        </div>
      </div>
    );
  };

  return <Fragment>{renderPostView()}</Fragment>;
};

export default PostView;
