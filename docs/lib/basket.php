<?php


class basket
{

	function set($key, $value)
	{
		$this->$key = $value;

	}

	function get($key)
	{
		if(isset($this->$key))
		{
			return $this->$key;
		}
		else
		{
			return null;
		}

	}

}

?>