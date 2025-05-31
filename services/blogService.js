class BlogService {
  constructor() {
    if (BlogService.instance) return BlogService.instance;

    this.allBlogs = [];
    BlogService.instance = this;
  }

  async fetchAllBlogs() {
    const response = await fetch('/data/fakeblogs.json');
    this.allBlogs = await response.json();
    return this.allBlogs;
  }
}
  
export default new BlogService();