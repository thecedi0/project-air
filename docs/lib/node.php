<?php


class node
{
	public $arr = array('0'=>'aleph','1'=>'beth','2'=>'gimmel','3'=>'daleth','4'=>'hey');


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

	function router()
	{
		require_once 'app'.DS.'controllers'.DS.'root.php';
		$root =  HASHEM::getinstance('root');


		if (isset($_GET['url']))
		{

			$url = $_GET['url'];
			$url = rtrim($url,'/');
			$url = explode('/',$url);

			foreach ($url as $key => $value)
			{

				if (isset($this->arr[$key]))
				{
					$this->set($this->arr[$key], $value);
				}
				else
				{
					$this->set($key, $value);
				}

			}

			if(isset($this->aleph))
			{
				$alpha = $this->aleph;
				$file = 'app'.DS.'controllers'.DS.$alpha.'.php';


				if (file_exists($file))
				{
					require_once $file;
					$app = HASHEM::getinstance($alpha);

					if (isset($this->beth))
					{
						$beta = $this->beth;
						if(method_exists($alpha,$beta))
						{
							$app->$beta();
						}
						else
						{
							$app->main();
						}
					}
					else
					{
						$app->main();
					}
				}
				else
				{
					if (method_exists('root',$alpha))
					{
						$root->$alpha();
					}
					else
					{
						$root->main();
					}
				}

			}



		}
		else
		{

			$root->main();
		}


	}



}



?>