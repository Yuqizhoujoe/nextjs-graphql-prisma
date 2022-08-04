import Link from "next/link";

const Post = ({ id, title, image }) => {
  return (
    <Link href={`/post/${id}`}>
      <a key={id} className="group ">
        <div className="w-full aspect-w-1 aspect-h-1 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-center object-cover group-hover:opacity-75 group-hover:scale-90"
          />
        </div>
        <h3 className="mt-4 text-2xl text-gray-500"> {title} 🥰 </h3>
      </a>
    </Link>
  );
};

export default Post;
