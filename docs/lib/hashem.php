<?php




class hashem
{
	private static $instance = array();
	public $tmpl = 'media';
	public $hash ='sitemaster';

	function main()
	{

		require_once 'lib'.DS.'node.php';
		$node = HASHEM::getinstance('node');
		$node->router();


	}

	function set($key, $value)
	{
		$this->$key = $value;
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




	public static function getinstance($class)
	{
		$host = "localhost";
		$db ="sicurezzaDBpro";
		$user ="root";
		$password = "";

	

		if (isset(self::$instance[$class]))
		{
			return self::$instance[$class];
		}
		else{
			if (!class_exists($class))
			{
				self::autoload($class);
			}

			if($class == 'pdo')
			{
				self::$instance[$class] = new PDO("mysql:host = $host;dbname=$db",$user,$password);
			}
			else
			{
			self::$instance[$class] = new $class;
			}

			return self::$instance[$class];
		}


	}


	public static function getModel($model)
	{

		$file = 'app'. DS .'models'. DS .$model .'.php';

		if (file_exists($file)){

			require_once $file;
			$model_obj = HASHEM::getinstance($model);

			return $model_obj;

		}else{
			echo 'the model '.$model.' does not exist';

		}



	}



	private static function autoload($class)
	{
		$paths = array('lib','app'.DS.'controllers','app'.DS.'models');
		foreach ($paths as $path)
		{
			$file = $path.DS.$class.'.php';

			if (file_exists($file))
			{
			require_once $file;
			}
			//else{echo "class does not exist!";}
		}




	}

	public static function render($view)
	{
		$hashem = HASHEM::getinstance('hashem');
		$hashem->set('view',$view);

		$hashem = HASHEM::getinstance('hashem');
		$tmpl = $hashem->get('tmpl');

		$basket = HASHEM::getinstance('basket');


		$request = HASHEM::getinstance('request');

		if (($request->get('tmpl')) != null)
		{
			$template = $request->get('tmpl');
			$file = 'templates'.DS.$template.DS.'index.php';
			//check if it exists
			if (file_exists($file))
			{$tmpl = $template;}
			else{$tmpl = 'default';}
		}

		if (($request->get('api')) == 'json' && ($request->get('hash')) == ($hashem->get('hash')))
		{
			echo json_encode($basket);

		}elseif (($request->get('api')) == 'html' && ($request->get('hash')) == ($hashem->get('hash')))
		{
			require_once 'app'.DS.'views'.DS.$view.DS.'default.php';
		}else{

			require_once 'templates'.DS.$tmpl.DS.'index.php';

		}




	}

	public static function app()
	{
		$hashem = HASHEM::getinstance('hashem');
		$view = $hashem->get('view');

		require_once 'app'.DS.'views'.DS.$view.DS.'default.php';

	}



	public static function Redirect($url, $code = 302)
{
    if (strncmp('cli', PHP_SAPI, 3) !== 0)
    {
        if (headers_sent() !== true)
        {
            if (strlen(session_id()) > 0) // if using sessions
            {
                session_regenerate_id(true); // avoids session fixation attacks
                session_write_close(); // avoids having sessions lock other requests
            }

            if (strncmp('cgi', PHP_SAPI, 3) === 0)
            {
                header(sprintf('Status: %03u', $code), true, $code);
            }

            header('Location: ' . $url, true, (preg_match('~^30[1237]$~', $code) > 0) ? $code : 302);
        }

        exit();
    }
}
}
?>