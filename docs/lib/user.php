<?php
class user
{

// ==================================================================
//
// User Login
//
// ------------------------------------------------------------------
    private $user_id;

    public function login($uname,$umail,$upass)
    {
       try
       {
        $pdo = HASHEM::getinstance('pdo');

        $sql = "SELECT * FROM ".TABLE_PREFIX."users WHERE username=:uname OR email=:umail LIMIT 1";
          $query = $pdo->prepare($sql);
          $query->execute(array(':uname'=>$uname, ':umail'=>$umail));
          $userRow=$query->fetch(PDO::FETCH_OBJ);
          if($query->rowCount() > 0)
          {
             if(password_verify($upass, $userRow->hash_word))
             {
                $_SESSION['user_session'] = $userRow->id;
                $_SESSION['level'] = $userRow->level;

                $_SESSION['count'] = 0;

                $this->user_id = $userRow->id;

                return true;
             }
             else
             {
                return false;
             }
          }
       }
       catch(PDOException $e)
       {
           echo $e->getMessage();
       }
   }

// ==================================================================
//
// Check If User is logged in
//
// ------------------------------------------------------------------

   public function is_loggedin()
   {
      if(isset($_SESSION['user_session']))
      {
         return true;
      }
   }

   public function message($msg="")
   {
      if($_SESSION['message'] =="")
      {
        $_SESSION['message'] = $msg;
      }
      else
      {
        return $_SESSION['message'];
      }
   }

// ==================================================================
//
// Logs User Out
//
// ------------------------------------------------------------------



   public function logout()
   {
        session_destroy();
        unset($_SESSION['user_session']);
        return true;
   }
}



?>