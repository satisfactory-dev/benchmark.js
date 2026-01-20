.PHONY: test coverage

VERSIONS = 20 21 22 23 24 25

nvm:
	@. ${NVM_DIR}/nvm.sh && nvm $(CMD)

nvm--install:
	@make nvm CMD="install $(VERSION)"

nvm--run: nvm--install
	@make nvm CMD="run $(VERSION) $(CMD)"

nvm--exec: nvm--install
	make nvm CMD="exec $(VERSION) $(CMD)"

init:
	@make nvm--exec VERSION=20 CMD="npm install"
	@for version in $(VERSIONS); do make nvm--install VERSION="$$version"; done
	@make nvm--exec VERSION=20 CMD="./node_modules/.bin/playwright install --with-deps --only-shell chromium firefox webkit"

test--all-versions:
	for version in $(VERSIONS); do make nvm--run VERSION="$$version" CMD="./test/test.js"; done

test:
	node ./test/test.js

coverage: coverage--clean coverage--node coverage--playwright

coverage--clean:
	git clean -fxd ./coverage/node/ ./coverage/playwright/

coverage--node:
	@VERSION=20 CMD="c8 -c ./.c8rc.node.json node ./test/test.js" make nvm--exec

coverage--playwright:
	@node ./playwright.js
	@VERSION=20 CMD="c8 -c ./.c8rc.playwright.json report" make nvm--exec

coverage--merge:
	git clean -fxd ./coverage/tmp/
	cp -r ./coverage/*/tmp/*.json ./coverage/tmp
	@VERSION=20 CMD="c8 report" make nvm--exec

docs:
	@make nvm CMD="use 20"
	@./node_modules/.bin/docdown benchmark.js doc/README.md style=github title="@satisfactory-dev/benchmark <span>$(shell git rev-parse HEAD)</span>" toc=categories url=https://github.com/satisfactory-dev/benchmark.js/blob/$(shell git rev-parse HEAD)/benchmark.js
	@make nvm CMD="use 25"
