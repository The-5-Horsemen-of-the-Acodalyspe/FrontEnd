.PHONY: all serve

all: out/script.js

serve: all
	tools/serve.js static

MODULES = chmod

out/script.js: $(foreach module, $(MODULES), modules/$(module).js)
	tools/merge.js $@ $^
