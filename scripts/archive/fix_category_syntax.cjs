const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'routes', 'category.$categoryId.tsx');
let code = fs.readFileSync(filePath, 'utf8');

// I can see the exact syntax error!
// The regex earlier did not properly insert the closing </Magnetic> tag.
// It left this:
//            <Magnetic>
//            <motion.div>
//               ...
//            </motion.div>
//          </motion.div>
// 
// Missing `</Magnetic>` before the final `</motion.div>`.

// Let's replace the broken structure
const brokenStructure = `<Magnetic>
            <motion.div
              whileHover={{ y: -2, scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            >
              <Link
                to="/products"
                className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white text-mocha/80 hover:text-choco shadow-sm border border-choco/5 hover:shadow-md transition-colors font-medium text-sm w-fit"
              >
                <span className="rtl:rotate-180">←</span> {t('product_details.back_to_categories', 'Back to Categories')}
              </Link>
            </motion.div>
          </motion.div>`;

const fixedStructure = `<Magnetic>
            <motion.div
              whileHover={{ y: -2, scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            >
              <Link
                to="/products"
                className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white text-mocha/80 hover:text-choco shadow-sm border border-choco/5 hover:shadow-md transition-colors font-medium text-sm w-fit"
              >
                <span className="rtl:rotate-180">←</span> {t('product_details.back_to_categories', 'Back to Categories')}
              </Link>
            </motion.div>
          </Magnetic>
        </motion.div>`;

// Fallback regex if precise string matching fails over whitespace issues
code = code.replace(/<Magnetic>([\s\S]*?Back to Categories'\)}\n\s*<\/Link>\s*<\/motion\.div>\s*)<\/motion\.div>/, "<Magnetic>$1</Magnetic>\n          </motion.div>");

fs.writeFileSync(filePath, code);
console.log("Magnetic closing tag syntax restored!");
