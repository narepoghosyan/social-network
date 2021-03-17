import profileReducer, { addPostActionCreator, deletePostActionCreator } from "./profile-reducer";

let state = {
    posts: [
        {id: 1, message: 'How are you?', likesCount: 3},
        {id: 2, message: 'It\'s my first post', likesCount: 4},
      ],
};

test('posts count should be incremented', () => {
    let action = addPostActionCreator("New post")

    let newState = profileReducer(state, action);

  expect(newState.posts.length).toBe(3);
});

test('post message should be correct', () => {
    let action = addPostActionCreator("New post")

    let newState = profileReducer(state, action);

  expect(newState.posts[2].message).toBe("New post");
});

test('posts count should be decremented', () => {
    let action = deletePostActionCreator(1);

    let newState = profileReducer(state, action);

  expect(newState.posts.length).toBe(1);
});

test('posts count should not be decremented if id is incorrect', () => {
    let action = deletePostActionCreator(4);

    let newState = profileReducer(state, action);

  expect(newState.posts.length).toBe(2);
});