﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AngularBlogCore.API.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AngularBlogCore.API.Controllers {
    [Route ("api/[controller]")]
    [ApiController]
    public class CommentsController : ControllerBase {
        private readonly AngularBlogContext _context;

        public CommentsController (AngularBlogContext context) {
            _context = context;
        }

        // GET: api/Comments
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Comment>>> GetComment () {
            return await _context.Comment.ToListAsync ();
        }

        // GET: api/Comments/5
       
        [HttpGet ("{id}")]
        public async Task<ActionResult> GetComment (int id) {

            var comments = await _context.Comment.Where (x => x.ArticleId == id).ToListAsync ();

            if (comments == null) return NotFound ();

            return Ok (comments);

        }

        // PUT: api/Comments/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut ("{id}")]
        public async Task<IActionResult> PutComment (int id, Comment comment) {
            if (id != comment.Id) {
                return BadRequest ();
            }

            _context.Entry (comment).State = EntityState.Modified;

            try {
                await _context.SaveChangesAsync ();
            } catch (DbUpdateConcurrencyException) {
                if (!CommentExists (id)) {
                    return NotFound ();
                } else {
                    throw;
                }
            }

            return NoContent ();
        }

        // POST: api/Comments
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<Comment>> PostComment (Comment comment) {
            _context.Comment.Add (comment);
            await _context.SaveChangesAsync ();

            return CreatedAtAction ("GetComment", new { id = comment.Id }, comment);
        }

        // DELETE: api/Comments/5
        [HttpDelete ("{id}")]
        public async Task<ActionResult<Comment>> DeleteComment (int id) {
            var comment = await _context.Comment.FindAsync (id);
            if (comment == null) {
                return NotFound ();
            }

            _context.Comment.Remove (comment);
            await _context.SaveChangesAsync ();

            return comment;
        }

        private bool CommentExists (int id) {
            return _context.Comment.Any (e => e.Id == id);
        }
    }
}