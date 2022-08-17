import { gql, useMutation } from "@apollo/client";

const CREATE_POST_MUTATION = gql`
  mutation CreatePost($post: PostInput!) {
    createPost(post: $post) {
      title
      content
      image
      user {
        id
        name
      }
    }
  }
`;

const EDIT_POST_MUTATION = gql`
  mutation UpdatePost($updatePostId: Int!, $data: UpdatePostInput!) {
    updatePost(id: $updatePostId, data: $data) {
      id
      title
      content
      published
      image
      user {
        id
        name
      }
      createdAt
    }
  }
`;

export default function useFormSubmit({ isCreate, postId }) {
  const QUERY = isCreate ? CREATE_POST_MUTATION : EDIT_POST_MUTATION;
  const [doSubmit, { data, loading, error }] = useMutation(QUERY);

  const doSubmitHandler = (formData) => {
    const price = parseInt(formData.price);
    if (isCreate) {
      doSubmit({
        variables: {
          post: {
            ...formData,
            price,
          },
        },
      });
    } else {
      doSubmit({
        variables: {
          updatePostId: parseInt(postId),
          data: {
            ...formData,
            price,
          },
        },
      });
    }
  };

  return {
    doSubmitHandler,
    data,
    loading,
    error,
  };
}
