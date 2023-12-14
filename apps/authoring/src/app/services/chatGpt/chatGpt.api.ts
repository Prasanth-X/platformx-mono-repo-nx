import { ApolloError } from '@apollo/client';
import graphqlInstance from '../../config/graphqlConfig';
import { CREATE_NEW_CHATGPT_REQUEST } from '../../graphql/chatGpt/chatGptMutateQueries';
import { showToastError } from '../../components/toastNotification/toastNotificationReactTostify';

export const createChatGptRequest = async <T>(input: T): Promise<any> => {
  try {
    const { data } = await graphqlInstance.mutate({
      mutation: CREATE_NEW_CHATGPT_REQUEST,
      variables: input,
    });
    return data;
  } catch (error) {
    if (error instanceof ApolloError) {
      console.log(error.graphQLErrors);
      showToastError(`${error.graphQLErrors[0].message}`);
    }
    throw error;
  }
};