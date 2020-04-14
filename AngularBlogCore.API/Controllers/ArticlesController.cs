using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using AngularBlogCore.API.Models;
using AngularBlogCore.API.Response;
using Microsoft.AspNetCore.Http;
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
        public async Task<IActionResult> GetArticle () {

            var articleResponse = await _context.Article
                .Include (x => x.Category)
                .Include (x => x.Comment)
                .OrderByDescending (x => x.PublishDate)
                .Select (x => new ArticleResponse () {
                    Id = x.Id,
                        Title = x.Title,
                        Picture = x.Picture,
                        ViewCount = x.ViewCount,
                        CommentCount = x.Comment.Count,
                        PublishDate = x.PublishDate,
                        Category = new CategoryResponse () {
                            Id = x.Category.Id,
                                Name = x.Category.Name
                        }
                })
                .ToListAsync ();

            return Ok (articleResponse);
        }

        // GET: api/Articles
        [HttpGet ("{page}/{pageSize}")]
        public async Task<IActionResult> GetArticle (int page = 1, int pageSize = 5) {

            System.Threading.Thread.Sleep (3000);

            IQueryable<Article> query = _context.Article
                .Include (x => x.Category)
                .Include (x => x.Comment)
                .OrderByDescending (x => x.PublishDate);

            var totalCount = query.Count ();
            var articleResponse = await ArticlePagination (query, page, pageSize);

            var result = new {
                Articles = articleResponse.Item1,
                TotalCount = articleResponse.Item2
            };

            return Ok (result);
        }

        [HttpGet]
        [Route ("GetArticlesWithCategory/{categoryId}/{page}/{pageSize}")]
        public async Task<IActionResult> GetArticlesWithCategory (int categoryId, int page = 1, int pageSize = 5) {

            System.Threading.Thread.Sleep (3000);

            IQueryable<Article> query = _context.Article
                .Include (x => x.Category)
                .Include (x => x.Comment)
                .Where (x => x.CategoryId == categoryId)
                .OrderByDescending (x => x.PublishDate);

            var articleResponse = await ArticlePagination (query, page, pageSize);

            var result = new {
                Articles = articleResponse.Item1,
                TotalCount = articleResponse.Item2
            };

            return Ok (result);
        }

        [HttpGet]
        [Route ("SearchArticle/{searchText}/{page}/{pageSize}")]
        public async Task<IActionResult> SearchArticle (string searchText, int page = 1, int pageSize = 5) {

            System.Threading.Thread.Sleep (3000);

            IQueryable<Article> query = _context.Article
                .Include (x => x.Category)
                .Include (x => x.Comment)
                .Where (x => x.Title.Contains (searchText))
                .OrderByDescending (x => x.PublishDate);

            var articleResponse = await ArticlePagination (query, page, pageSize);

            var result = new {
                Articles = articleResponse.Item1,
                TotalCount = articleResponse.Item2
            };

            return Ok (result);
        }

        [HttpGet]
        [Route ("GetArticlesByMostView")]
        public async Task<IActionResult> GetArticlesByMostView () {

            System.Threading.Thread.Sleep (3000);

            var articles = await _context.Article
                .OrderByDescending (x => x.ViewCount)
                .Take (5)
                .Select (x => new ArticleResponse () {
                    Title = x.Title,
                        Id = x.Id
                })
                .ToListAsync ();

            return Ok (articles);
        }

        [HttpGet]
        [Route ("GetArticlesArchive")]
        public async Task<IActionResult> GetArticlesArchive () {

            System.Threading.Thread.Sleep (3000);

            var articles = await _context.Article
                .GroupBy (x => new { x.PublishDate.Year, x.PublishDate.Month })
                .Select (x =>
                    new {
                        year = x.Key.Year,
                            month = x.Key.Month,
                            monthName = new DateTime (x.Key.Year, x.Key.Month, 1).ToString ("MMMM"),
                            count = x.Count ()
                    })
                .ToListAsync ();

            return Ok (articles);
        }

        [HttpGet]
        [Route ("GetArticlesArchiveList/{year}/{month}/{page}/{pageSize}")]
        public async Task<IActionResult> GetArticlesArchiveList (int year, int month, int page, int pageSize) {

            System.Threading.Thread.Sleep (3000);

            var query = _context.Article
                .Include (x => x.Category)
                .Include (x => x.Comment)
                .Where (x => x.PublishDate.Year == year && x.PublishDate.Month == month);

            var resultQuery = await ArticlePagination (query, page, pageSize);

            var result =
                new {
                    Articles = resultQuery.Item1,
                    TotalCount = resultQuery.Item2
                };

            return Ok (result);
        }

        [HttpGet]
        [Route ("ArticleViewCountUp/{id}")]
        public async Task<IActionResult> ArticleViewCountUp (int id) {

            var article = await _context.Article.FindAsync (id);

            article.ViewCount += 1;
            await _context.SaveChangesAsync ();
            return Ok ();
        }

        // GET: api/Articles/5
        [HttpGet ("{id}")]
        public async Task<ActionResult<ArticleResponse>> GetArticle (int id) {

            System.Threading.Thread.Sleep (3000);

            var article = await _context.Article
                .Include (x => x.Category)
                .Include (x => x.Comment)
                .FirstOrDefaultAsync (x => x.Id == id);

            if (article == null) {
                return NotFound ();
            }

            ArticleResponse articleResponse = new ArticleResponse () {
                Id = article.Id,
                Title = article.Title,
                ContentMain = article.ContentMain,
                ContentSummary = article.ContentSummary,
                Picture = article.Picture,
                PublishDate = article.PublishDate,
                ViewCount = article.ViewCount,
                Category = new CategoryResponse () { Id = article.Category.Id, Name = article.Category.Name },
                CommentCount = article.Comment.Count
            };

            return articleResponse;
        }

        // PUT: api/Articles/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut ("{id}")]
        public async Task<IActionResult> PutArticle (int id, Article article) {

            var firstArticle = _context.Article.Find (id);

            firstArticle.Title = article.Title;
            firstArticle.ContentMain = article.ContentMain;
            firstArticle.ContentSummary = article.ContentSummary;
            firstArticle.CategoryId = article.Category.Id;
            firstArticle.Picture = article.Picture;
            
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
        public async Task<IActionResult> PostArticle (Article article) {

            if (article.Category != null) {
                article.CategoryId = article.Category.Id;
            }

            article.Category = null;
            article.PublishDate = DateTime.Now;
            article.ViewCount = 0;

            _context.Article.Add (article);
            await _context.SaveChangesAsync ();

            return Ok ();
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

        public async Task<Tuple<IEnumerable<ArticleResponse>, int>> ArticlePagination (IQueryable<Article> query, int page, int pageSize) {

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

            return new Tuple<IEnumerable<ArticleResponse>, int> (articleResponse, totalCount);
        }

        [HttpPost]
        [Route ("SaveArticlePicture")]
        public async Task<IActionResult> SaveArticlePicture (IFormFile picture) {

            var fileName = $"{Guid.NewGuid ().ToString ()}{Path.GetExtension (picture.FileName)}";
            var path = Path.Combine (Directory.GetCurrentDirectory (), "wwwroot/articlePictures", fileName);

            using (var stream = new FileStream (path, FileMode.Create)) {

                await picture.CopyToAsync (stream);

            }

            var result = new {
                path = $"http://{Request.Host}/articlePictures/{fileName}"
            };

            return Ok (result);
        }
        private bool ArticleExists (int id) {
            return _context.Article.Any (e => e.Id == id);
        }
    }
}