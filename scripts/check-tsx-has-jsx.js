/* eslint-disable no-console */
const fs = require("fs");
const path = require("path");
const ts = require("typescript");

function walk(dir, out) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) walk(p, out);
    else if (ent.isFile() && p.endsWith(".tsx")) out.push(p);
  }
}

function hasJsx(filePath) {
  const text = fs.readFileSync(filePath, "utf8");
  const sf = ts.createSourceFile(
    filePath,
    text,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TSX
  );

  let found = false;
  function visit(n) {
    if (found) return;
    if (
      n.kind === ts.SyntaxKind.JsxElement ||
      n.kind === ts.SyntaxKind.JsxSelfClosingElement ||
      n.kind === ts.SyntaxKind.JsxFragment
    ) {
      found = true;
      return;
    }
    ts.forEachChild(n, visit);
  }
  visit(sf);
  return found;
}

function main() {
  const srcRoot = path.resolve(process.cwd(), "src");
  if (!fs.existsSync(srcRoot)) {
    console.error(`[check:tsx] src 폴더를 찾을 수 없습니다: ${srcRoot}`);
    process.exit(2);
  }

  const tsxFiles = [];
  walk(srcRoot, tsxFiles);

  const noJsx = tsxFiles.filter((f) => !hasJsx(f));
  if (noJsx.length > 0) {
    console.error("[check:tsx] JSX가 없는 .tsx 파일이 있습니다. .ts로 변경하세요:");
    for (const f of noJsx) {
      console.error(`- ${path.relative(process.cwd(), f)}`);
    }
    process.exit(1);
  }

  console.log(`[check:tsx] OK (${tsxFiles.length} files)`);
}

main();


