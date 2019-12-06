.PHONY: all serve

all: out/script.js

serve: all
	tools/serve.js static

MODULES = chmod su sl curl xdotool

out/script.js: $(foreach module, $(MODULES), modules/$(module).js)
	tools/merge.js $@ $^
