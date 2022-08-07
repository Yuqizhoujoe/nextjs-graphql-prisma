import Input from "../common/Input";
import { inputConstant, inputTypes } from "../../shared/constant";
import useInput from "../../hooks/useInput";
import { validate, validateAmount, validateImage } from "../../shared/helper";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import _ from "lodash";
import Link from "next/link";
import useFormSubmit from "../../hooks/useFormSubmit";

const CreateEditPost = (props) => {
  // input
  const {
    value: title,
    initiateValueHandler: titleInitiate,
    inputChangeHandler: titleChange,
    blurEventHandler: titleBlur,
    isTouched: titleTouched,
    error: titleError,
    reset: resetTitle,
  } = useInput((title) => validate(title));

  const {
    value: image,
    initiateValueHandler: imageInitiate,
    inputChangeHandler: imageChange,
    blurEventHandler: imageBlur,
    isTouched: imageTouched,
    error: imageError,
    reset: resetImage,
  } = useInput((image) => validateImage(image));

  const {
    value: content,
    initiateValueHandler: contentInitiate,
    inputChangeHandler: contentChange,
    blurEventHandler: contentBlur,
    isTouched: contentTouched,
    error: contentError,
    reset: resetContent,
  } = useInput((content) => validate(content));

  const {
    value: price,
    initiateValueHandler: priceInitiate,
    inputChangeHandler: priceChange,
    blurEventHandler: priceBlur,
    isTouched: priceTouched,
    error: priceError,
    reset: resetPrice,
  } = useInput((price) => validateAmount(price));
  const handlePriceChange = (e) => {
    const price = e.target.value;
    const parsedValue = price.replace(/[^\d.]/gi, "");
    priceChange(e, parsedValue);
  };

  // published
  const [isPublished, setIsPublished] = useState(false);
  const publishedCheckboxHandler = (e) => {
    e.preventDefault();
    setIsPublished((prevState) => !prevState);
  };

  // Next Auth, Next Router
  const { data: session } = useSession();
  const router = useRouter();

  const [isCreate, setIsCreate] = useState(true);
  const [userId, setUserId] = useState("");
  const [postId, setPostId] = useState("");

  useEffect(() => {
    const { title, image, content, published, price } = { ...props };
    if (title && image && content) {
      imageInitiate(image);
      titleInitiate(title);
      contentInitiate(content);
      priceInitiate(price);
      if (published) setIsPublished(true);
      setIsCreate(false);
    }
  }, []);

  useEffect(() => {
    const postId = _.get(router, "query.postId", null);
    const userId = _.get(session, "user.id", null);
    setUserId(userId);
    setPostId(postId);
  }, [session, router]);

  const { doSubmitHandler, data, error } = useFormSubmit({ isCreate, postId });
  const postFormSubmitHandler = (e) => {
    e.preventDefault();
    let postData = {
      title,
      content,
      image,
      published: isPublished,
      price,
    };

    if (isCreate) {
      postData = {
        ...postData,
        userId,
      };
    }

    doSubmitHandler(postData);
  };

  const reset = () => {
    resetTitle();
    resetContent();
    resetImage();
    resetPrice();
  };

  useEffect(() => {
    if (data && !_.isEmpty(data)) {
      console.log("CREATE_EDIT_POST", data);
      reset();
      router.replace(`/user/${userId}/posts`);
    }
  }, [data]);

  const renderGoBackLink = () => {
    const goBackButton = (
      <button
        type="button"
        className="text-white w-2/5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      >
        <span aria-hidden="true">←</span>
      </button>
    );

    if (isCreate && userId) {
      return <Link href={`/user/${userId}/posts`}>{goBackButton}</Link>;
    }

    return <Link href={`/post/${postId}`}>{goBackButton}</Link>;
  };

  return (
    <form
      id="post-edit-create-form"
      className="post_edit_create_form min-h-full flex flex-col"
      onSubmit={postFormSubmitHandler}
    >
      <div className="mx-auto w-2/5 flex flex-col items-center justify-center px-2">
        <div className="form-group form-check px-6 py-8 rounded shadow-md text-black w-full">
          <h1 className="mb-8 text-3xl text-center text-white">
            {isCreate ? "Create" : "Edit"} Post
          </h1>
          <Input
            error={titleError && titleTouched}
            type={inputTypes.TEXT}
            id={inputConstant.TITLE}
            name={inputConstant.TITLE}
            placeholder="Title"
            value={title}
            inputChangeHandler={titleChange}
            blurHandler={titleBlur}
            isRequired
          />
          <Input
            error={imageError && imageTouched}
            type={inputTypes.URL}
            id={inputConstant.IMAGE_URL}
            name={inputConstant.IMAGE_URL}
            placeholder="Image Url..."
            value={image}
            inputChangeHandler={imageChange}
            blurHandler={imageBlur}
            isRequired
          />
          <Input
            type={inputTypes.TEXTAREA}
            error={contentError && contentTouched}
            id={inputConstant.CONTENT}
            name={inputConstant.CONTENT}
            placeholder="Content"
            value={content}
            inputChangeHandler={contentChange}
            blurHandler={contentBlur}
            textLimit={100}
            isRequired
          />
          <Input
            type={inputTypes.CHECK_BOX}
            id={inputConstant.PUBLISHED_CHECK_BOX}
            name={inputConstant.PUBLISHED_CHECK_BOX}
            value={isPublished}
            inputChangeHandler={publishedCheckboxHandler}
          />
          <Input
            error={priceTouched && priceError}
            type={inputTypes.TEXT}
            id={inputConstant.PRICE}
            name={inputConstant.PRICE}
            placeholder="$"
            value={parseInt(price)}
            inputChangeHandler={handlePriceChange}
            blurHandler={priceBlur}
          />
          {renderGoBackLink()}
          <button
            type="submit"
            className="w-1/2 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
          >
            {isCreate ? "Create" : "Edit"} Post
          </button>
        </div>
      </div>
    </form>
  );
};

export default CreateEditPost;
