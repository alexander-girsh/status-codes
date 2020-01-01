/**
 * @ignore
 * An adaption to use named import (to fix required module name)
 * for node 13.*.* projects which use esm-modules
 */
import module_content from './index.js'

export const codes = module_content.codes
