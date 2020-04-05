using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AngularBlogCore.API.Models;
using AngularBlogCore.API.Response;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AngularBlogCore.API.Controllers {
    [Route ("api/[controller]")]
    [ApiController]
    public class ArticlesController : ControllerBase {
        private readonly AngularBlogContext _context;

        public ArticlesController (AngularBlogContext context) {
            _context = context;
        }

        // GET: api/Articles
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Article>>> GetArticle () {
            return await _context.Article.ToListAsync ();
        }

        // GET: api/Articles
        [HttpGet ("{page}/{pageSize}")]
        public async Task<IActionResult> GetArticle (int page = 1, int pageSize = 5) {
            IQueryable<Article> query = _context.Article
                .Include (x => x.Category)
                .Include (x => x.Comment)
                .OrderByDescending (x => x.PublishDate);

            var totalCount = query.Count ();
            var articleResponse = (await query
                    .Skip (pageSize * (page - 1))
                    .Take (pageSize)
                    .ToListAsync ())
                .Select (x => new ArticleResponse () {
                    Id = x.Id,
                        Title = x.Title,
                        ContentMain = x.ContentMain,
                        ContentSummary = x.ContentSummary,
                        Picture = x.Picture,
                        ViewCount = x.ViewCount,
                        CommentCount = x.Comment.Count,
                        Category = new CategoryResponse () {
                            Id = x.Category.Id,
                                Name = x.Category.Name
                        }
                });

            var result = new {
                TotalCount = totalCount,
                Articles = articleResponse
            };

            return Ok (result);
        }

        // GET: api/Articles/5
        [HttpGet ("{id}")]
        public async Task<ActionResult<Article>> GetArticle (int id) {
            var article = await _context.Article.FindAsync (id);

            if (article == null) {
                return NotFound ();
            }

            return article;
        }

        // PUT: api/Articles/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut ("{id}")]
        public async Task<IActionResult> PutArticle (int id, Article article) {
            if (id != article.Id) {
                return BadRequest ();
            }

            _context.Entry (article).State = EntityState.Modified;

            try {
                await _context.SaveChangesAsync ();
            } catch (DbUpdateConcurrencyException) {
                if (!ArticleExists (id)) {
                    return NotFound ();
                } else {
                    throw;
                }
            }

            return NoContent ();
        }

        // POST: api/Articles
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<Article>> PostArticle (Article article) {
            _context.Article.Add (article);
            await _context.SaveChangesAsync ();

            return CreatedAtAction ("GetArticle", new { id = article.Id }, article);
        }

        // DELETE: api/Articles/5
        [HttpDelete ("{id}")]
        public async Task<ActionResult<Article>> DeleteArticle (int id) {
            var article = await _context.Article.FindAsync (id);
            if (article == null) {
                return NotFound ();
            }

            _context.Article.Remove (article);
            await _context.SaveChangesAsync ();

            return article;
        }

        private bool ArticleExists (int id) {
            return _context.Article.Any (e => e.Id == id);
        }
    }
}