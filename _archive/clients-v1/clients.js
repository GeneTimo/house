// Archived 2026-11-11 from index_work.html, lines 1139-1161 (GSAP block, after the .insight-anim triggers, before "Grouped reveals").
// Also related: line 774 excludes the cells from the generic reveal: gsap.utils.toArray('[data-reveal]:not(.client)')

      // --- Clients logos: each row fades up on its own (cells in a row share
      // a centre, so they fire together), one cell at a time left to right.
      // Later and slower than the generic reveal above (top 85%, 0.6s), which
      // played out with the logos still at the very bottom edge and went
      // unnoticed: here a row starts once its logos are a quarter of the
      // screen up from the bottom, each cell takes 1.2s, and each next column
      // waits 0.2s more. The column is read off the live grid (4 across, 2 on
      // mobile) when the row fires. ---
      gsap.utils.toArray('.client[data-reveal]').forEach(function (cell, i) {
        if (reduceMotion) return;
        ScrollTrigger.create({
          trigger: cell,
          start: 'center 75%',
          once: true,
          onEnter: function () {
            var cols = getComputedStyle(cell.parentNode).gridTemplateColumns.split(' ').length;
            gsap.fromTo(cell,
              { opacity: 0, y: 30 },
              { opacity: 1, y: 0, duration: 1.2, delay: (i % cols) * 0.2, ease: 'power2.out', clearProps: 'transform' }
            );
          }
        });
      });
