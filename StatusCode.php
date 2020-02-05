<?php

class StatusCode implements \ArrayAccess
{
    private $container;

    public function __construct(string $json) {
        $arr = json_decode($json, true);
        $this->container = $this->fillDataRecursively($arr);
    }

    public function fillDataRecursively($arr) {
        foreach($arr as $key => $val) {
            if(is_array($val))
            {
                $arr[$key] = $this->fillDataRecursively($val);
            }
            else {
                $arr[$key] = [
                    'code' => $val,
                    'message' => $key
                ];
            }

        }

        return $arr;
    }

    public function offsetSet($offset, $value) {
        return null;
    }

    public function offsetExists($offset) {
        return isset($this->container[$offset]);
    }

    public function offsetUnset($offset) {
        return null;
    }

    public function offsetGet($offset) {
        return $this->container[$offset] ?? null;
    }
}