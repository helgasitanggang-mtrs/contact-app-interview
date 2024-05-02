// FILEPATH: /home/helgasitanggang/interview/contact-app-interview/contact-app/src/redux/actions.test.js

import axios from "axios";
import {
  fetchContacts,
  postContacts,
  getContactById,
  updateContactById,
  deleteContactById,
} from "../actions";

import { apiUrl } from "../../api";

jest.mock("axios");

describe("actions", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("fetchContacts", async () => {
    const dispatch = jest.fn();
    const getState = jest.fn();
    const response = { data: [] };
    axios.get.mockResolvedValue(response);

    await fetchContacts()(dispatch, getState, null);

    expect(axios.get).toHaveBeenCalledWith(apiUrl.contactUrl);
    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(dispatch).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({ type: "contact/fetchContactsRequest/pending" })
    );
    expect(dispatch).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        type: "contact/fetchContactsRequest/fulfilled",
        payload: response.data,
      })
    );
  });

  test('postContacts', async () => {
    const dispatch = jest.fn();
    const getState = jest.fn();
    const response = { data: {} };
    const data = {
      firstName: 'John',
      lastName: 'Doe',
      age: '30',
      imagePreview: 'test.jpg',
    };
    axios.post.mockResolvedValue(response);
  
    await postContacts(data)(dispatch, getState, null);
  
    expect(axios.post).toHaveBeenCalledWith(apiUrl.contactUrl, {
      firstName: data.firstName,
      lastName: data.lastName,
      age: Number(data.age),
      photo: data.imagePreview,
    });
    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(dispatch).toHaveBeenNthCalledWith(1, expect.objectContaining({ type: 'contact/createContactsRequest/pending' }));
    expect(dispatch).toHaveBeenNthCalledWith(2, expect.objectContaining({ type: 'contact/createContactsRequest/fulfilled', payload: response.data }));
  });

  test('getContactById', async () => {
    const dispatch = jest.fn();
    const getState = jest.fn();
    const response = { data: {} };
    const data = { id: '1' };
    axios.get.mockResolvedValue(response);
  
    await getContactById(data)(dispatch, getState, null);
  
    expect(axios.get).toHaveBeenCalledWith(`${apiUrl.contactUrl}/${data.id}`);
    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(dispatch).toHaveBeenNthCalledWith(1, expect.objectContaining({ type: 'contact/fetchContactById/pending' }));
    expect(dispatch).toHaveBeenNthCalledWith(2, expect.objectContaining({ type: 'contact/fetchContactById/fulfilled', payload: response.data }));
  });

  test('updateContactById', async () => {
    const dispatch = jest.fn();
    const getState = jest.fn();
    const response = { data: {} };
    const data = {
      id: '1',
      firstName: 'John',
      lastName: 'Doe',
      age: '30',
      imagePreview: 'test.jpg',
    };
    axios.put.mockResolvedValue(response);
  
    await updateContactById(data)(dispatch, getState, null);
  
    expect(axios.put).toHaveBeenCalledWith(`${apiUrl.contactUrl}/${data.id}`, {
      firstName: data.firstName,
      lastName: data.lastName,
      age: Number(data.age),
      photo: data.imagePreview,
    });
    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(dispatch).toHaveBeenNthCalledWith(1, expect.objectContaining({ type: 'contact/updateContactRequest/pending' }));
    expect(dispatch).toHaveBeenNthCalledWith(2, expect.objectContaining({ type: 'contact/updateContactRequest/fulfilled', payload: response.data }));
  });

  test('deleteContactById', async () => {
    const dispatch = jest.fn();
    const getState = jest.fn();
    const response = { data: {} };
    const dataId = '1';
    axios.delete.mockResolvedValue(response);
  
    await deleteContactById(dataId)(dispatch, getState, null);
  
    expect(axios.delete).toHaveBeenCalledWith(`${apiUrl.contactUrl}/${dataId}`);
    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(dispatch).toHaveBeenNthCalledWith(1, expect.objectContaining({ type: 'contact/deleteContactRequest/pending' }));
    expect(dispatch).toHaveBeenNthCalledWith(2, expect.objectContaining({ type: 'contact/deleteContactRequest/fulfilled', payload: response.data }));
  });
});
