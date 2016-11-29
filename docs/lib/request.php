<?php


class request
{


	function __construct()
	{
		foreach($_REQUEST as $key => $value)
		{
			$this->$key = $value;
		}
	}

	function get($key)
	{
		if (isset($this->$key))
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