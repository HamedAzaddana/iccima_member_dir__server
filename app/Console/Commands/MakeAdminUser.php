<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use App\Models\AdminUser;
use App\Helpers\Pdate;

class MakeAdminUser extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'admins:make';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Make User Admin !';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $first_name = $this->ask('Enter first name?');
        $last_name = $this->ask('Enter last name?');

        $email = $this->ask('Enter email?');
        $password = $this->ask('Enter password?');
        $password_hash = Hash::make($password);
        $cell_phone = $this->ask('Enter cell_phone?');
        $national_code = $this->ask('Enter national_code?');
        $unqiue_flds = [
            "cell_phone",
            "national_code"
        ];
        foreach ($unqiue_flds as $unqiue_fld) {
            if (AdminUser::exists_field(${"$unqiue_fld"}, $unqiue_fld)) {
                $this->error("$unqiue_fld Exists before !");
                return;
            }
        }
        AdminUser::updateOrCreate([
            "email"   => $email,
        ], [
            "first_name" => $first_name,
            "last_name" => $last_name,
            "email" => $email,
            "password" => $password_hash,
            "cell_phone" => $cell_phone,
            "national_code" => $national_code,
            "last_updated_at" => Pdate::persianTimeStampNow(),
        ]);
        $this->info('The Admin Created Succeessfully !');
    }
}
