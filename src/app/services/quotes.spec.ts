import { TestBed } from "@angular/core/testing";
import { HttpClientModule } from "@angular/common/http";
import { QuotesService } from "./quotes.service";
import { of } from "rxjs";

fdescribe('QuotesService', ()=>{
let service: QuotesService;

beforeEach(()=>{
 TestBed.configureTestingModule({
  providers:[QuotesService],
  imports:[HttpClientModule]
 })
 service = TestBed.get(QuotesService);
});

it('should be created',()=>{
  expect(service).toBeTruthy();
});

it('square Async',(done) =>{
  const num = 5;
  service.squareAsync(num).subscribe((result)=>{
    expect(result).toBe(num * num);
    done();
  })
});

it('sum Async', async () =>{
  const a = 5;
  const b = 40;

 const result = await service.asyncSum(a,b);
 expect(result).toBe(a+b);

});

});
