<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

class ErrorViewController extends Controller
{
    public function page_404()
    {
      return view("errors.404");
    }
    public function page_403()
    {
        return view("errors.403");
    }
}
