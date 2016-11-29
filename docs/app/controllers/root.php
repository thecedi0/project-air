<?php

/**
 * Copyright (c) 2016 Hashem Studioz.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions
 * are met:
 *
 *   * Redistributions of source code must retain the above copyright
 *     notice, this list of conditions and the following disclaimer.
 *
 *   * Redistributions in binary form must reproduce the above copyright
 *     notice, this list of conditions and the following disclaimer in
 *     the documentation and/or other materials provided with the
 *     distribution.
 *
 *   * Neither the names of the copyright holders nor the names of the
 *     contributors may be used to endorse or promote products derived
 *     from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS
 * FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 * COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
 * INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING,
 * BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT
 * LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN
 * ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 * POSSIBILITY OF SUCH DAMAGE.
 *
 * @package     [ Package ]
 * @subpackage  [ Subpackage ]
 * @author      Owusu-Afriyie Kofi <koathecedi@gmail.com>
 * @copyright   2016 Hashem Studioz.
 * @license     http://www.opensource.org/licenses/bsd-license.php  BSD License
 * @link        http://hashemstudioz.co.nf
 * @version     @@2.00@@
 */

class root
{
		function main()
	{
		HASHEM::render('home');

	}

	function article()
	{
		$model = HASHEM::getmodel('root_model');
		$model->getArticle();
		HASHEM::render('article');

	}


	function services()
	{
		$model = HASHEM::getmodel('services_model');
		$model->getDefault();
		$model->getServices();
		HASHEM::render('services');

	}

	function services_art()
	{
		$model = HASHEM::getmodel('services_model');
		$model->getServiceArticle();
		$model->getServices();
		HASHEM::render('services_article');

	}


	function contact()
	{
		$model = HASHEM::getmodel('root_model');
		if(isset($_POST['send'])){
			$model->sendContact();
		}
		$model->getContact();
		HASHEM::render('contact');

	}

	function contact_us()
	{
		HASHEM::render('contact_Map');

	}




}
















 ?>