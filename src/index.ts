import express from 'express';
import fs from 'fs';
import yaml from 'js-yaml';

import { StatusCodes, getReasonPhrase } from 'http-status-codes';

import type { RouteParameters } from 'express-serve-static-core';

interface Route {
  route: string;
  code: number;
}

interface RouteFile {
  routes: Route[];
}

function getHtmlPage(code: number) {
  return `<html><head><title>${code}: ${getReasonPhrase(code)}</title></head><body><h1>${code}: ${getReasonPhrase(code)}</h1></body></html>`
}

const app = express();

const routesFile = fs.existsSync('routes.yaml')
  ? 'routes.yaml'
  : fs.existsSync('routes.yml')
  ? 'routes.yml'
  : null;
if (routesFile) {
  try {
    const doc = yaml.load(fs.readFileSync(routesFile, { encoding: 'utf-8' })) as RouteFile;
    doc.routes.forEach((route) => {
      app.get(route.route, (_, res) => {
        res.status(route.code).send(getHtmlPage(route.code));
      });
    })
  } catch (e) {
    console.error('Could not load routes file');
    console.error(e);
    process.exit(1);
  }
}

app.get<RouteParameters<'/:code'>>('/:code([0-9]{3})', (req, res) => {
  const code = Number(req.params.code);
  res.status(code).send(getHtmlPage(code));
});

app.listen(3000);
