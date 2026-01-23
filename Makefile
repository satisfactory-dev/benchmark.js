.PHONY: test coverage

VERSIONS = 20 22 23 24 25

nvm:
	@. ${NVM_DIR}/nvm.sh && nvm $(CMD)

nvm--install:
	@make nvm CMD="install $(VERSION)"

nvm--run: nvm--install
	@make nvm CMD="run $(VERSION) $(CMD)"

nvm--exec: nvm--install
	@make nvm CMD="exec $(VERSION) $(CMD)"

build:
	@make nvm--exec VERSION=20 CMD="node ./dump-version.js"
	@make nvm--exec VERSION=20 CMD="./node_modules/.bin/rolldown -c ./rolldown.config.js"

init:
	@make nvm--exec VERSION=20 CMD="npm install"
	@for version in $(VERSIONS); do make nvm--install VERSION="$$version"; done
	@make nvm--exec VERSION=20 CMD="./node_modules/.bin/playwright install --with-deps --only-shell chromium firefox webkit"
	@make build

test--all-versions: build
	@for version in $(VERSIONS); do make nvm--run VERSION="$$version" CMD="./test/test.js"; done

test: build
	@node ./test/test.js

coverage: coverage--clean coverage--node coverage--playwright coverage--merge

coverage--clean: build
	@git clean -fxd ./coverage/node/ ./coverage/playwright/

coverage--node:
	@make nvm--exec VERSION=20 CMD="npm ci --omit=optional"
	@make nvm--exec VERSION=20 CMD="./node_modules/.bin/c8 -c ./.c8rc.node.json node ./test/test.js"
	@make nvm--exec VERSION=20 CMD="npm ci"
	@make nvm--exec VERSION=20 CMD="./node_modules/.bin/c8 -c ./.c8rc.node.json node ./test/test.js"

coverage--playwright: build
	@make nvm--exec VERSION=20 CMD="node ./playwright.js --browser=chromium"
	@make nvm--exec VERSION=20 CMD="./node_modules/.bin/c8 -c ./.c8rc.playwright.json report"

coverage--merge:
	@git clean -fxd ./coverage/tmp/
	@cp -r ./coverage/*/tmp/*.json ./coverage/tmp
	@make nvm--exec VERSION=20 CMD="./node_modules/.bin/c8 report"

docs:
	@make nvm CMD="use 20"
	@./node_modules/.bin/docdown benchmark.js doc/README.md style=github title="@satisfactory-dev/benchmark <span>$(shell git rev-parse HEAD)</span>" toc=categories url=https://github.com/satisfactory-dev/benchmark.js/blob/$(shell git rev-parse HEAD)/benchmark.js
	@make nvm CMD="use 25"
