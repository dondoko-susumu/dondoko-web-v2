const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)
const locales = require(`./config/i18n`);
const {
  localizedSlug,
  findKey,
  removeTrailingSlash,
} = require(`./src/utils/gatsby-node-helpers`);

// Modifying pages created by core or plugins
exports.onCreatePage = ({ page, actions }) => {
  const { createPage, deletePage } = actions;

  // First delete the incoming page that was automatically created by Gatsby
  // So everything in src/pages/
  deletePage(page);

  // Grab the keys ('en' & 'pt') of locales and map over them
  Object.keys(locales)
    .filter(lang => !locales[lang].disable)
    .map(lang => {
      // Use the values defined in "locales" to construct the path
      const localizedPath = locales[lang].default
        ? page.path
        : `${locales[lang].path}${page.path}`;

      return createPage({
        // Pass on everything from the original page
        ...page,
        // Since page.path returns with a trailing slash (e.g. "/pt/")
        // We want to remove that (e.g. "pt/")
        path: removeTrailingSlash(localizedPath),
        // Pass in the locale as context to every page
        // This context also gets passed to the src/components/layout file
        // This should ensure that the locale is available on every page
        context: {
          ...page.context,
          locale: lang,
          dateFormat: locales[lang].dateFormat,
        },
      });
    });
};

// As you don't want to manually add the correct languge to the frontmatter of each file
// a new node is created automatically with the filename
// It's necessary to do that -- otherwise you couldn't filter by language
exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    // Use path.basename
    // https://nodejs.org/api/path.html#path_path_basename_path_ext
    // It will return the file name without '.md' string (e.g. "file-name" or "file-name.lang")
    const name = path.basename(node.fileAbsolutePath, `.md`);

    // Find the key that has "default: true" set (in this case it returns "en")
    const defaultKey = findKey(locales, o => o.default === true);

    // Check if file.name.lang has the default lang type.
    // (in this case the default language is for files set with "en")
    const isDefault = name.split(`.`)[1] === defaultKey;

    // Files are defined with "name-with-dashes.lang.md"
    // So grab the lang from that string
    // If it's the default language, pass the locale for that
    const lang = isDefault ? defaultKey : name.split(`.`)[1];

    // slug
    const filePath = createFilePath({ node, getNode });
    const slugArray = filePath.split(`/`).filter(p => p !== '');
    slugArray.pop(); // delete last path (e,g index.ja)
    const slug = slugArray.join(`/`);

    // Adding the nodes on GraphQL for each post as "fields"
    createNodeField({ node, name: `slug`, value: slug });
    createNodeField({ node, name: `locale`, value: lang });
    createNodeField({ node, name: `isDefault`, value: isDefault });
  }
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const blogPost = path.resolve(`./src/templates/blog-post.js`)

  // create post page for each locale
  Object.keys(locales)
    .filter(lang => !locales[lang].disable)
    .map(async lang => {
      const result = await graphql(
        `
        {
          allMarkdownRemark(
            filter: { fields: { locale: { eq: "${lang}" } }}
            sort: { fields: [frontmatter___date], order: DESC }
            limit: 1000
          ) {
            edges {
              node {
                fields {
                  slug
                  locale
                  isDefault
                }
                frontmatter {
                  title
                }
              }
            }
          }
        }
      `
      )

      if (result.errors) {
        throw result.errors
      }

      // Create blog posts pages.
      const posts = result.data.allMarkdownRemark.edges

      posts.forEach((post, index) => {
        const previous = index === posts.length - 1 ? null : posts[index + 1].node
        const next = index === 0 ? null : posts[index - 1].node

        // Getting Slug and Title
        const slug = post.node.fields.slug;
        const title = post.node.frontmatter.title;

        // Use the fields created in exports.onCreateNode
        const locale = post.node.fields.locale;
        const isDefault = post.node.fields.isDefault;

        createPage({
          path: localizedSlug({ isDefault, locale, slug }),
          component: blogPost,
          context: {
            previous,
            next,
            // Pass both the "title" and "locale" to find a unique file
            // Only the title would not have been sufficient as articles could have the same title
            // in different languages, e.g. because an english phrase is also common in german
            locale,
            title,
            dateFormat: locales[locale].dateFormat,
          },
        })
      })
    })
}
