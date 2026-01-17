.PHONY: test coverage

VERSIONS = 10 11 24 25

nvm:
	@. ${NVM_DIR}/nvm.sh && nvm $(CMD)

nvm--install:
	@make nvm CMD="install $(VERSION)"

init:
	@npm install
	@for version in $(VERSIONS); do make nvm--install VERSION="$$version"; done
	@make nvm CMD="use 25"
	@npm root -g | sed 's/^/NODE_PATH=/' | tee playwright-node.env
	@npm install -g playwright
	@playwright install --with-deps --only-shell chromium

nvm--run: nvm--install
	@make nvm CMD="run $(VERSION) $(CMD)"

nvm--exec: nvm--install
	make nvm CMD="exec $(VERSION) $(CMD)"

test--all-versions:
	for version in $(VERSIONS); do make nvm--run VERSION="$$version" CMD="./test/test.js"; done

test:
	node ./test/test.js

coverage: coverage--clean coverage--node coverage--playwright

coverage--clean:
	git clean -fxd ./coverage/node/ ./coverage/playwright/

coverage--node:
	@VERSION=10 CMD="npm install -g c8@7" make nvm--exec
	@VERSION=10 CMD="c8 -c ./.c8rc.node.json node ./test/test.js" make nvm--exec

coverage--playwright:
	@make nvm CMD="use 25"
	@npm root -g | sed 's/^/NODE_PATH=/' | tee playwright-node.env
	@node --env-file=playwright-node.env ./playwright.js
	@VERSION=10 CMD="c8 -c ./.c8rc.playwright.json report" make nvm--exec

coverage--merge:
	git clean -fxd ./coverage/tmp/
	cp -r ./coverage/*/tmp/*.json ./coverage/tmp
	@VERSION=10 CMD="c8 report" make nvm--exec

docs:
	@make nvm CMD="use 10"
	@./node_modules/.bin/docdown benchmark.js doc/README.md style=github title="@satisfactory-dev/benchmark " toc=categories url=https://github.com/satisfactory-dev/benchmark.js/benchmark.js
	@make nvm CMD="use 25"
