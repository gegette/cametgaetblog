export const state = () => ({
  posts: []
})

export const mutations = {
  updatePosts: (state, payload) => {
    state.posts = payload
  }
}

export const actions = {
  //this will be asynchronous
  async getPosts({
    state,
    commit
  }) {
    // If API already called, do nothing
    if (state.posts.length) return
    try {
      let posts = await fetch( `https://cametgaetauboutdumonde.fr/wp-json/wp/v2/posts?page=1&per_page=20&_embed=1`
      ).then(res => res.json())
      posts = posts
        .filter(el => el.status === "publish")
        .map(({ id, slug, title, excerpt, date, tags, content }) => ({
          id,
          slug,
          title,
          excerpt,
          date,
          tags,
          content
        }))
      commit("updatePosts", posts)
    } catch (err) {
      console.log(err)
    }
  }
}
