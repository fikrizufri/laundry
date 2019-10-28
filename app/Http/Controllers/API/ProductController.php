<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\LaundryPrice;
use App\Http\Resources\ProductCollection;
use App\LaundryType;
use Faker\Factory as Faker;

class ProductController extends Controller
{
    public function index()
    {
        // $this->dummy();
        $products = LaundryPrice::with(['type', 'user'])->orderBy('created_at', 'DESC');
        if (request()->q != '') {
            $products = $products->orWhere('name', 'LIKE', '%' . request()->q . '%');
        }
        $products = $products->paginate(10);
        return new ProductCollection($products);
    }
    public function getLaundryType()
    {
        $type = LaundryType::orderBy('name', 'ASC')->get(); //GET DATA LAUNDRY TYPE DENGAN DI URUTKAN BERDASARKAN NAMA
        return response()->json(['status' => 'success', 'data' => $type]);
    }

    public function storeLaundryType(Request $request)
    {
        //VALIDASI DATA YANG DIKIRIM
        $this->validate($request, [
            'name_laundry_type' => 'required|unique:laundry_types,name'
        ]);

        //SIMPAN DATA BARU KE DALAM TABLE LAUNDRY_TYPES
        LaundryType::create(['name' => $request->name_laundry_type]);
        return response()->json(['status' => 'success']);
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'name' => 'required|string|max:100',
            'unit_type' => 'required',
            'price' => 'required|integer',
            'laundry_type' => 'required',

            //TAMBAHKAN VALIDASI UNTUK DUA DATA BARU
            'service' => 'required|integer',
            'service_type' => 'required'
        ]);

        try {
            LaundryPrice::create([
                'name' => $request->name,
                'unit_type' => $request->unit_type,
                'laundry_type_id' => $request->laundry_type,
                'price' => $request->price,
                'user_id' => auth()->user()->id,

                //SIMPAN INFORMASI DATA BARU TERSEBUT
                'service' => $request->service,
                'service_type' => $request->service_type
            ]);
            return response()->json(['status' => 'success']);
        } catch (\Exception $e) {
            return response()->json(['status' => 'failed']);
        }
    }

    public function edit($id)
    {
        $laundry = LaundryPrice::find($id); //MENGAMBIL DATA BERDASARKAN ID
        return response()->json(['status' => 'success', 'data' => $laundry]);
    }

    public function update(Request $request, $id)
    {
        //KARENA BELUM ADA VALIDASI SEBELUMNYA, KITA TAMBAHKAN VALIDASINYA
        $this->validate($request, [
            'name' => 'required|string|max:100',
            'unit_type' => 'required',
            'price' => 'required|integer',
            'laundry_type' => 'required',
            'service' => 'required|integer',
            'service_type' => 'required'
        ]);

        $laundry = LaundryPrice::find($id);
        $laundry->update([
            'name' => $request->name,
            'unit_type' => $request->unit_type,
            'laundry_type_id' => $request->laundry_type,
            'price' => $request->price,

            //UPDATE DATA BARU TERSEBUT
            'service' => $request->service,
            'service_type' => $request->service_type
        ]);
        return response()->json(['status' => 'success']);
    }

    public function destroy($id)
    {
        $laundry = LaundryPrice::find($id);
        $laundry->delete();
        return response()->json(['status' => 'success']);
    }

    public function dummy()
    {
        $faker = Faker::create('id_ID');

        for ($i = 0; $i < 100; $i++) {
            # code...
            LaundryPrice::create([
                'name' => $faker->name,
                'unit_type' => 1,
                'laundry_type_id' => 1,
                'price' => $faker->randomNumber(4),
                'user_id' => 1
            ]);
        }
    }
}
